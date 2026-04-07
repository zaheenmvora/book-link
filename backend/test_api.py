import requests

def test_patch():
    url = "http://127.0.0.1:8000/books/1"
    try:
        # Just a dummy test to see status code, we don't care about auth here yet
        # it should return 401 or 403, NOT 405.
        response = requests.patch(url, json={"title": "Test Update"})
        print(f"PATCH {url} status: {response.status_code}")
        print(f"Response: {response.text}")
        
        url_slash = "http://127.0.0.1:8000/books/1/"
        response_slash = requests.patch(url_slash, json={"title": "Test Update"})
        print(f"PATCH {url_slash} status: {response_slash.status_code}")
        print(f"Response: {response_slash.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_patch()
