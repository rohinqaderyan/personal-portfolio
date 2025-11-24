# Flask Backend for Portfolio Contact Form

This Flask microservice handles contact form submissions and sends emails via a transactional email provider.

## Features

- REST API endpoint for contact form submissions
- Input validation
- CORS support for Next.js frontend
- Health check endpoint
- Easy integration with popular email providers (SendGrid, Mailgun, AWS SES, etc.)

## Setup

### Local Development

1. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**:
   - Windows: `venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file** (copy from `.env.example`):
   ```bash
   copy .env.example .env
   ```

5. **Configure environment variables** in `.env`:
   ```env
   FLASK_ENV=development
   PORT=5000
   
   # Email configuration
   MAIL_PROVIDER_API_KEY=your_api_key_here
   MAIL_FROM=noreply@yourdomain.com
   MAIL_TO=your@email.com
   ```

6. **Run the server**:
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`.

## Email Provider Integration

The `send_email()` function in `app.py` is abstracted. Choose your preferred email provider and integrate:

### SendGrid Example

```python
pip install sendgrid

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_email(name, email, message):
    mail = Mail(
        from_email=MAIL_FROM,
        to_emails=MAIL_TO,
        subject=f'Portfolio Contact from {name}',
        html_content=f'''
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Message:</strong></p>
            <p>{message}</p>
        '''
    )
    
    sg = SendGridAPIClient(MAIL_PROVIDER_API_KEY)
    response = sg.send(mail)
    return response.status_code == 202
```

### Mailgun Example

```python
pip install mailgun2

import mailgun2

def send_email(name, email, message):
    mg = mailgun2.Mailgun(MAIL_PROVIDER_API_KEY)
    result = mg.send_message(
        'yourdomain.com',
        to=MAIL_TO,
        sender=MAIL_FROM,
        subject=f'Portfolio Contact from {name}',
        text=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
    )
    return result.status_code == 200
```

### AWS SES Example

```python
pip install boto3

import boto3

def send_email(name, email, message):
    client = boto3.client('ses', region_name='us-east-1')
    response = client.send_email(
        Source=MAIL_FROM,
        Destination={'ToAddresses': [MAIL_TO]},
        Message={
            'Subject': {'Data': f'Portfolio Contact from {name}'},
            'Body': {
                'Text': {'Data': f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"}
            }
        }
    )
    return response['ResponseMetadata']['HTTPStatusCode'] == 200
```

## API Endpoints

### `GET /health`
Health check endpoint.

**Response**:
```json
{
  "status": "healthy",
  "service": "portfolio-contact-api"
}
```

### `POST /send-email`
Send contact form email.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project."
}
```

**Response** (Success):
```json
{
  "message": "Email sent successfully",
  "success": true
}
```

**Response** (Error):
```json
{
  "error": "Error message here"
}
```

## Testing

Run tests with pytest:
```bash
pytest
```

## Deployment

### Heroku

1. Create a `Procfile`:
   ```
   web: gunicorn app:app
   ```

2. Deploy:
   ```bash
   heroku create your-app-name
   heroku config:set MAIL_PROVIDER_API_KEY=your_key
   heroku config:set MAIL_FROM=noreply@yourdomain.com
   heroku config:set MAIL_TO=your@email.com
   git push heroku main
   ```

### AWS Lambda (via Zappa)

1. Install Zappa:
   ```bash
   pip install zappa
   ```

2. Initialize:
   ```bash
   zappa init
   ```

3. Deploy:
   ```bash
   zappa deploy production
   ```

### Docker

1. Build image:
   ```bash
   docker build -t portfolio-contact-api .
   ```

2. Run container:
   ```bash
   docker run -p 5000:5000 \
     -e MAIL_PROVIDER_API_KEY=your_key \
     -e MAIL_FROM=noreply@yourdomain.com \
     -e MAIL_TO=your@email.com \
     portfolio-contact-api
   ```

## Security Considerations

- Use environment variables for sensitive data (never commit API keys)
- Implement rate limiting for production (use Flask-Limiter)
- Add request validation and sanitization
- Use HTTPS in production
- Consider adding CAPTCHA to prevent spam

## License

MIT
