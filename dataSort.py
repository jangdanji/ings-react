import json
import pprint
import random

# JSON 파일 열기
with open('./public/data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

rawData = """
101. The British Wildlife Foundation ------- donations last
week by calling its longtime members.
(A) solicit
(B) solicits
(C) are soliciting
(D) solicited
"""

rawData

newData = {
    'quiz': {
        'quiz-MCQ':[

]

        
    }
}

data['quiz']['quiz-MCQ']

# # 데이터 출력
# for post in data['board']:

#   post['like'] = 0


pprint.pprint(data)

with open("./public/data.json", "w", encoding='utf-8') as json_file:
    json.dump(data, json_file, ensure_ascii=False, indent=2)