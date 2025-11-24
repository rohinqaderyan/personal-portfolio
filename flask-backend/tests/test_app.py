import pytest
from app import app


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_health_check(client):
    """Test the health check endpoint"""
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json['status'] == 'healthy'


def test_send_email_missing_fields(client):
    """Test send email with missing required fields"""
    response = client.post('/send-email', json={})
    assert response.status_code == 400
    assert 'error' in response.json


def test_send_email_invalid_email(client):
    """Test send email with invalid email"""
    response = client.post('/send-email', json={
        'name': 'Test User',
        'email': 'invalid-email',
        'message': 'Test message that is long enough'
    })
    assert response.status_code == 400


def test_send_email_success(client):
    """Test successful email sending"""
    response = client.post('/send-email', json={
        'name': 'Test User',
        'email': 'test@example.com',
        'message': 'This is a test message that meets the minimum length requirement.'
    })
    # In mock mode, this should succeed
    assert response.status_code == 200
    assert response.json['success'] == True
