import json
import pprint

# JSON 파일 열기
with open('./public/data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

  
postData = []

# 데이터 출력
for post in data['board']:

  post["comment"] = []


pprint.pprint(data['board'])