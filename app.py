import eel
import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
import re

eel.init('web')

searchGame = {
    '新楓之谷':'859'
}
searchServer = {
    '全伺服':'0',
    '艾麗亞':'862',
    '普力特':'863',
    '琉德':'883',
    '優伊娜':'913',
    '愛麗西亞':'944',
    '殺人鯨':'984',
    '燃燒':'3249',
    'reboot':'19860',
    '其它':'860'
 }

searchType = {
    '全部':'',
    '遊戲幣':'0',
    '道具':'1',
    '帳號':'2',
    '點數卡':'3',
    '代練':'4',
    '送禮':'5',
    '其它':'6'
}
priceSort = {
    '默認':'0',
    '低到高':'1',
    '高到低':'2'
}

ua = UserAgent()
headers = {
    'User-Agent': ua.chrome
}


@eel.expose
def www(gl,sl,il,stl,it,rg1,rg2,ch1,uid):
    b_name=[x.strip('\n') for x in black_name()]
    num = 0
    efno = []
    while(True):
        url = 'https://www.8591.com.tw/mallList-list.html?'+\
        '&searchGame='+searchGame[gl]+\
        '&searchServer='+searchServer[sl]+\
        '&searchType='+searchType[il]+\
        '&searchKey='+str(it)+\
        '&priceSort=' +priceSort[stl]+\
        '&priceStart='+rg1+\
        '&priceEnd='+rg2+\
        '&buyStatus='+ch1+\
        '&uid='+uid+\
        '&firstRow='+ str(num)
        print(url)
        eel.sleep(2)
        r = requests.get(url,headers=headers,allow_redirects=False)
        soup = BeautifulSoup(r.text, 'html.parser')
        if ch1 == '1':
            items = soup.find_all("a",href=re.compile("^./s(.*)html"))#商品網址
        else:
            items = soup.find_all("a",href=re.compile(".mallList-wareDetail.html.............."))#商品網址
        items1 = soup.find_all("div",class_="other")#價格&數量
        items2 = soup.find_all("a",href=re.compile("im:"))#賣家編號
        adlist = []
        i = 0
        if len(items)>0:
            for item1 in range(int(len(items1)/2)):
                adlist.append([f'價格:{items1[i].string}',f'數量:{items1[i+1].contents[0]}'])
                i+=2
            for item,item1,item2 in zip(items,adlist,items2):
                if item2['data-fuid'] in b_name:
                    pass
                else:
                    efno.append(['https://www.8591.com.tw'+item['href'],item['title'],item1[0],item1[1],item2['data-fuid']])
            if num >= 0:
                break
            num+=21
        else:
            break
    return(efno)


def fter(xitem:str,efno:list):
    newitems = filter(lambda x : xitem not in x ,efno)
    nitems = list(newitems)
    return(nitems)

def black_name():
   with open('namelist.txt','r') as f:
       return(f.read().split(','))


eel.start("main.html",host="192.168.1.101",mode='chrome',size=(1920,1080))