import threading
import socket
import pigpio
import cups
import os
from bluetooth import *
from pynput.keyboard import Key, Controller
from time import sleep

HOST = "localhost"
PORT = 12345

# socket connection w/ app
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print("Socket created")

while True:
    try:
        s.bind((HOST, PORT))
        break
    except OSError:
        print("Bind failed")
        sleep(1)

s.listen(5)
print("Socket waiting for connection")
conn, addr = s.accept()
print("Socket connected!")

# bluetooth socket
bluetooth_socket = BluetoothSocket(RFCOMM)
while True:
    try:
        bluetooth_socket.connect(("98:D3:41:F9:7E:1F", 1))
        print("Bluetooth connected!")
        break
    except:
        print("Bluetooth connection failed")
        sleep(1)

# printer connection
while True:
    try:
        printer_conn = cups.Connection()
        break
    except:
        print("Printer connection failed")
        sleep(1)

# dictionary containing info about all available printers
printers = printer_conn.getPrinters()
available_printers = list(printers.keys())
printer_using = available_printers[0]
print(printer_using, "connected!")

# keyboard control
keyboard = Controller()

# servo motor setup
pi = pigpio.pi()

horizontal_servo_pin = 10  # range 1200 ~ 1700, mid = 1450
vertical_servo_pin = 9  # range 600 ~ 900, top = 600

horizontal_servo_angle = 1450
vertical_servo_angle = 600

# joystick mode (0 : remote control, 1 : camera tilting)
mode = 0


def remote_control(input):
    key_lst = {"L": Key.left, "R": Key.right,
               "U": Key.up, "D": Key.down, "C": Key.enter}
    if input in key_lst:  # to solve initial input issue
        keyboard.press(key_lst[input])
        keyboard.release(key_lst[input])


def camera_tilt(input):
    global horizontal_servo_angle, vertical_servo_angle
    if input == "L":
        horizontal_servo_angle -= 5
        if horizontal_servo_angle < 1200:
            horizontal_servo_angle = 1200
        pi.set_servo_pulsewidth(horizontal_servo_pin, horizontal_servo_angle)
    elif input == "R":
        horizontal_servo_angle += 5
        if horizontal_servo_angle > 1700:
            horizontal_servo_angle = 1700
        pi.set_servo_pulsewidth(horizontal_servo_pin, horizontal_servo_angle)
    elif input == "U":
        vertical_servo_angle -= 5
        if vertical_servo_angle < 600:
            vertical_servo_angle = 600
        pi.set_servo_pulsewidth(vertical_servo_pin, vertical_servo_angle)
    elif input == "D":
        vertical_servo_angle += 5
        if vertical_servo_angle > 900:
            vertical_servo_angle = 900
        pi.set_servo_pulsewidth(vertical_servo_pin, vertical_servo_angle)
    elif input == "C":
        keyboard.press(Key.enter)
        keyboard.release(Key.enter)


def toggle_mode():
    while True:
        # socket communication
        data = conn.recv(1024)
        data_str = data.decode()
        print(data_str)

        global mode
        print(mode)
        if data_str == "remote":
            mode = 0
            # stop servo
            pi.set_servo_pulsewidth(horizontal_servo_pin, 0)
            pi.set_servo_pulsewidth(vertical_servo_pin, 0)
        elif data_str == "camera":
            mode = 1
            # start servo
            pi.set_servo_pulsewidth(
                horizontal_servo_pin, horizontal_servo_angle)
            pi.set_servo_pulsewidth(vertical_servo_pin, vertical_servo_angle)
        elif data_str == "print":
            printer_conn.printFile(printer_using, "./image.jpg", "title", {})  # print image
            sleep(5)  # delay for printing
            print("print done")
            os.remove("./image.jpg")  # delete printed image
        elif data_str == "reset":
            os.system("sudo ./usbreset /dev/bus/usb/001/003")


# daemon thread for socket communication
t = threading.Thread(target=toggle_mode, daemon=True)
t.start()

while True:
    # receiving via bluetooth
    byte = bluetooth_socket.recv(1024)
    # print("received message : {}".format(byte))

    if mode == 0:
        remote_control(byte.decode())
    else:
        camera_tilt(byte.decode())


print("Finished")
# t.join()  # wait till thread finishes
bluetooth_socket.close()
conn.close()
