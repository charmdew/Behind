import threading
import socket
import pigpio
import cups
import os
import sys
import subprocess as sp
from bluetooth import *
from parse import *
from pynput.keyboard import Key, Controller
from time import sleep


def remote_control(input):
    key_lst = {"L": Key.left, "R": Key.right, "U": Key.up, "D": Key.down, "C": Key.enter}
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


# joystick mode (0 : remote control, 1 : camera tilting)
mode = 0

def bt_comms():
    connected = False

    while True:
        if not connected:
            try:
                bluetooth_socket = BluetoothSocket(RFCOMM)
                bluetooth_socket.connect(("98:D3:51:F9:59:5D", 1))
                connected = True
                print("Bluetooth connected!")
            except BluetoothError:
                print("Bluetooth connection failed")
                bluetooth_socket.close()
                sleep(1)
        else:
            try:
                # receiving via bluetooth
                inp = bluetooth_socket.recv(1024)  # data type : bytes
                # print("received message : {}".format(input))

                inp_lst = [b'L', b'R', b'U', b'D', b'C']
                if inp in inp_lst:  # to solve multiple input issue
                    global mode
                    if mode == 0:
                        remote_control(inp.decode())
                        print(inp.decode())
                        sleep(0.5)  # delay for slower user input
                    else:
                        if inp.decode() == "C":
                            remote_control(inp.decode())
                            sleep(3)  # wainting for image process
                        else:
                            camera_tilt(inp.decode())
            except BluetoothError:
                connected = False
                print("Bluetooth connection lost... reconnecting..")


# thread for bluetooth communication
t = threading.Thread(target=bt_comms, daemon=True)
t.start()

# printer connection
while True:
    try:
        printer_conn = cups.Connection()
        break
    except:
        print("Printer connection failed")
        sleep(1)

printers = printer_conn.getPrinters()  # dict containing info about all available printers
available_printers = list(printers.keys())
printer_using = available_printers[0]
print(printer_using, "connected!")

# keyboard control
keyboard = Controller()

# servo motor setup
os.system("sudo killall pigpiod")  # kill pigpio daemon
sleep(1)
os.system("sudo pigpiod")  # start pigpio daemon
sleep(1)

pi = pigpio.pi()  # grant access to GPIO

horizontal_servo_pin = 10  # left - right (range = 1200 ~ 1700, mid = 1450)
vertical_servo_pin = 9  # up - down (range = 600 ~ 900, top = 600)

horizontal_servo_angle = 1450
vertical_servo_angle = 600

# socket connection w/ FE app
HOST = "localhost"
PORT = 12345

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)  # tells kernel to reuse socket in TIME_WAIT state, without waiting for natural timeout expire
print("Socket created")

while True:
    try:
        s.bind((HOST, PORT))
        break
    except OSError:
        print("Bind failed")
        sys.exit(1)

s.listen(5)
print("Socket waiting for connection")
conn, addr = s.accept()
print("Socket connected!")


while True:
    # socket communication
    data = conn.recv(1024)
    if not data:
        break
    data_str = data.decode()
    print(data_str)

    if data_str == "remote":
        sleep(0.5)
        mode = 0
        # stop servo
        pi.set_servo_pulsewidth(horizontal_servo_pin, 0)
        pi.set_servo_pulsewidth(vertical_servo_pin, 0)
    elif data_str == "camera":
        mode = 1
        # start servo
        pi.set_servo_pulsewidth(horizontal_servo_pin, horizontal_servo_angle)
        pi.set_servo_pulsewidth(vertical_servo_pin, vertical_servo_angle)
    elif data_str == "print":
        while True:
            try:
                printer_conn.printFile(printer_using, "./image.png", "Profile card", {})  # print image
                print("print done")
                break
            except:
                print("Print failed")
                sleep(1)
        os.remove("./image.png")  # delete printed image
    elif data_str == "camreset":
        # webcam usb port parsing
        output = sp.getoutput("lsusb | grep EXOB-C200")
        bus, dev = parse(
            "Bus {} Device {}: ID 0c45:636b Microdia EXOB-C200", output)
        print(output)
        print(bus)
        print(dev)
        # reset webcam usb for reuse
        os.system("sudo ./usbreset /dev/bus/usb/{}/{}".format(bus, dev))
    print("current mode : ", mode)

pi.stop()
print("GPIO stopped")
conn.close()
print("Socket closed")
print("Finished")

