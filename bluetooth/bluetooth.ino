#include <SoftwareSerial.h>

#define BT_RXD 2
#define BT_TXD 3

SoftwareSerial bluetooth(BT_RXD, BT_TXD);

void setup() {
  Serial.begin(9600);
  bluetooth.begin(9600);
  pinMode(8, INPUT_PULLUP); // joystick
}

void loop() {
  int x = analogRead(A1);
  int y = analogRead(A2);
  int click = digitalRead(8);

  // 0 ~ 1023
  if (x > 973){
    bluetooth.write("U");
    delay(50);
  }
  else if (x < 50){
    bluetooth.write("D");
    delay(50);
  }

  if (y > 973){
    bluetooth.write("R");
    delay(50);
  }
  else if (y < 50){
    bluetooth.write("L");
    delay(50);
  }

  if (click == 0){
    bluetooth.write("C");
    delay(50);
  }

  // if(bluetooth.available()) {
  //   Serial.write(bluetooth.read());
  // }

  // if(Serial.available()) {
  //   bluetooth.write(Serial.read());
  // }
}

