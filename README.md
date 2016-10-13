# Sword Soul Game(剑气碧烟横)
This is a 2D endless mode arcade game. You are a hero who keeps fighting various fo monsters. 
During game process, you can get items to power up your health and skills. 
To get higher score, you need to beat as many enemies as you could. 
But at first, make sure you can survive.  
## live
https://xinyzhang9.github.io/jianqi/bin/index.html
## features
- [x] Endless mode: enemies are generated automatically based on your current difficulty level
- [x] Level upgrade: level upgrades when your score is high enough to make the game more challenging.
- [x] Super moves: your MP is accumulated by time. When it is half-full or full, you can release supermoves to clear enemies.
- [x] Extra items: when you beat the boss, you can get a random item, either increase your hp or power up your attack skills.
- [x] Easy uI: game infomation or tips are present. Just follow them.  

## To do list
- [ ] make UI more attractive
- [ ] migrate to mobile version  

## get it run locally
```
clone or download this repo
cd [path to this repo]
(I assume you have installed python)
python -m SimpleHTTPServer 8000
open your browser at localhost:8000/bin/index.html
```
## game instructions
'S': Sword Wave, requires 0 MP    
'A': Sword Trap, requires 5 MP  
'D': Sword Soul, requries 10 MP  
'ESC': Pause/Resume game  

## screenshots
![alt tag](https://raw.githubusercontent.com/xinyzhang9/JianQi_Game/master/screen.png)


