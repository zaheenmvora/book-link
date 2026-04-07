import urllib.request
import json

def test_patch():
    url = "http://127.0.0.1:8000/books/1"
    data = json.dumps({"title": "Test Update"}).encode('utf-8')
    
    print(f"Testing PATCH {url}...")
    req = urllib.request.Request(url, data=data, method='PATCH')
    req.add_header('Content-Type', 'application/json')
    
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Status: {response.status}")
            print(f"Body: {response.read().decode()}")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code}")
        print(f"Response: {e.read().decode()}")
    except Exception as e:
        print(f"Error: {e}")

    url_slash = "http://127.0.0.1:8000/books/1/"
    print(f"\nTesting PATCH {url_slash}...")
    req_slash = urllib.request.Request(url_slash, data=data, method='PATCH')
    req_slash.add_header('Content-Type', 'application/json')
    
    try:
        with urllib.request.urlopen(req_slash) as response:
            print(f"Status: {response.status}")
            print(f"Body: {response.read().decode()}")
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code}")
        print(f"Response: {e.read().decode()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_patch()
