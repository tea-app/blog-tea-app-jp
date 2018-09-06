#テスト用

##シリアルログインの無効化
Raspberry Pi のシリアルピンは、シリアル端末からログインできるようになっているので、まずそれを無効化しなければ、干渉してしまう。
/boot/cmdline.txt から console=ttyAMA0,115200 を削除する

/boot/config.txt の末端に下記を追記（bluetoothが使えなくなります　これどうにかならんかいな）
dtoverlay=pi3-miniuart-bt


/boot/config.txt　最後に追記
dtoverlay=pi3-miniuart-bt

##lwiringPiのインストール
$ sudo apt-get install libi2c-dev

##プログラム例
https://github.com/iRosSoftware/RC-S620S-StudentCard


##RC-S620S (FFC-6の字を上に見た場合)
6 (GND)
5(5はなし)
4 (GND)
3 (TX) 
2 (RX)
1 (VDD DC 5V or 3.3V)

##Rasberry Pi(マイクロSDカードスロットを上に見た場合)
0 0
0 1 
0 4
0 2
0 3
0 0
0 6

##ソースコード
https://github.com/iRosSoftware/Raspberry-RCS620S

