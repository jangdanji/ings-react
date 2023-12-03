import json
import requests
import pprint

NOTION_API_URL = "https://api.notion.com/v1/databases/7660a26510c744af9a52a6669ee53bd9"
NOTION_API_KEY = 'secret_sZg3wfIvJuNLD5UVIZcHu5YXVWuY9RffdY5S2JB4XVz'

headers = {
    "Authorization": f"Bearer {NOTION_API_KEY}",
    "Notion-Version": "2022-06-28",  # 현재 Notion API 버전,
    "Content-Type" : 	"application/json"
}

# payload = { "page_size": 100 }

# 데이터 조회하기 (get방식으로는 그냥 요약된 데이터, 데이터 방식만 보여주네)
# response = requests.get(NOTION_API_URL, headers=headers)
response = requests.post(NOTION_API_URL + '/query', headers=headers)

# API 응답 확인
if response.status_code == 200:
    data = response.json()
    pprint.pprint(data)
else:
    pprint.pprint(response.json())

body = {
  'parent': {
    'type': 'database_id',
    'database_id': '7660a26510c744af9a52a6669ee53bd9',
  },

  'properties': {
    'data_id': {
        'title': [ # 데이터 타입임 title
          {'text': {'content': '157'}}
        ]
    },
    'id': { # keyname
      'number': 157
    },
    # 날짜 형태의 필드의 경우
    'datetime': {  # keyname
      'date': {  # datatype: date
        'start': '2023-01-01'
      }
    },
    'head': {
        'rich_text': [
          {'text' : {'content' : '솰라솰라'}}
        ]
    },
    'content': {
        'rich_text': [
          {'text' : {'content' : '컨텐츠'}}
        ]
    },
    'category': {
      'number': 111
    },
    'user': {
        'rich_text': [
          {'text' : {'content' : '조나단'}}
        ]
    },
  },
}

# # 데이터 삽입
# url = 'https://api.notion.com/v1/pages'
# response = requests.post(
#     url=url,
#     headers=headers,
#     data=json.dumps(body)
# )

# # API 응답 확인
# if response.status_code == 200:
#     data = response.json()
#     pprint.pprint(data)
# else:
#     pprint.pprint(response.json())

    