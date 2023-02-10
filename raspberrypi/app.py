import threading
import socket
import cups
import os
from bluetooth import *
from pynput.keyboard import Key, Controller
import RPi.GPIO as GPIO
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
GPIO.setmode(GPIO.BCM)

horizontal_servo_pin = 10  # horizontal servo (left-right)
vertical_servo_pin = 9  # vertical servo (up-down)

GPIO.setup(horizontal_servo_pin, GPIO.OUT)
GPIO.setup(vertical_servo_pin, GPIO.OUT)

horizontal_servo = GPIO.PWM(horizontal_servo_pin, 50)  # frequency : 50Hz
vertical_servo = GPIO.PWM(vertical_servo_pin, 50)

horizontal_servo.start(0)
vertical_servo.start(0)

horizontal_servo_duty = 6.75  # range : 5.5 ~ 8.0
vertical_servo_duty = 2.7  # range : 2.7 ~ 5.4

# joystick mode (0 : remote control, 1 : camera tilting)
mode = 0


def remote_control(input):
    key_lst = {"L": Key.left, "R": Key.right,
               "U": Key.up, "D": Key.down, "C": Key.enter}
    if input in key_lst:  # to solve initial input issue
        keyboard.press(key_lst[input])
        keyboard.release(key_lst[input])


def camera_tilt(input):
    global horizontal_servo_duty, vertical_servo_duty
    if input == "L":
        horizontal_servo_duty -= 0.05
        if horizontal_servo_duty < 5.5:
            horizontal_servo_duty = 5.5
        horizontal_servo.ChangeDutyCycle(horizontal_servo_duty)
    elif input == "R":
        horizontal_servo_duty += 0.05
        if horizontal_servo_duty > 8.0:
            horizontal_servo_duty = 8.0
        horizontal_servo.ChangeDutyCycle(horizontal_servo_duty)
    elif input == "U":
        vertical_servo_duty -= 0.05
        if vertical_servo_duty < 2.7:
            vertical_servo_duty = 2.7
        vertical_servo.ChangeDutyCycle(vertical_servo_duty)
    elif input == "D":
        vertical_servo_duty += 0.05
        if vertical_servo_duty > 5.4:
            vertical_servo_duty = 5.4
        vertical_servo.ChangeDutyCycle(vertical_servo_duty)
    elif input == "C":
        keyboard.press(Key.enter)
        keyboard.release(Key.enter)


def toggle_mode():
    while True:
        # socket communication
        data = conn.recv(1024)
        data_str = data.decode()

        global mode
        if data_str == "remote":
            mode = 0
            # stop servo
            horizontal_servo.ChangeDutyCycle(0)
            vertical_servo.ChangeDutyCycle(0)
        elif data_str == "camera":
            mode = 1
            # start servo
            horizontal_servo.ChangeDutyCycle(horizontal_servo_duty)
            vertical_servo.ChangeDutyCycle(vertical_servo_duty)
        elif data_str == "print":
            printer_conn.printFile(printer_using, "./image.jpg", "title", {})  # print image
            os.remove("./image.jpg")  # delete printed image


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

horizontal_servo.stop()
vertical_servo.stop()
GPIO.cleanup()

# t.join()  # wait till thread finishes
bluetooth_socket.close()
conn.close()
