from flask import Flask, request, jsonify  # type: ignore
from flask_cors import CORS  # type: ignore # type: ignore
import os
from dotenv import load_dotenv # pyright: ignore[reportMissingImports]
import logging

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Email configuration (abstract - adapt to your email provider)
MAIL_PROVIDER_API_KEY = os.getenv('MAIL_PROVIDER_API_KEY')
MAIL_FROM = os.getenv('MAIL_FROM')
MAIL_TO = os.getenv('MAIL_TO')


def send_email(name, email, message):
    """
    Abstract email sending function.
    Integrate with your preferred email service:
    - SendGrid
    - Mailgun
    - AWS SES
    - Postmark
    - etc.
    
    Example with SendGrid:
    from sendgrid import SendGridAPIClient
    from sendgrid.helpers.mail import Mail
    
    message = Mail(
        from_email=MAIL_FROM,
        to_emails=MAIL_TO,
        subject=f'Portfolio Contact from {name}',
        html_content=f'<strong>Name:</strong> {name}<br><strong>Email:</strong> {email}<br><br>{message}'
    )
    
    sg = SendGridAPIClient(MAIL_PROVIDER_API_KEY)
    response = sg.send(message)
    return response.status_code == 202
    """
    
    # Mock implementation for development
    logger.info(f"Email would be sent to {MAIL_TO}")
    logger.info(f"From: {name} ({email})")
    logger.info(f"Message: {message}")
    
    # Check if mail settings are configured
    if not MAIL_PROVIDER_API_KEY or not MAIL_FROM or not MAIL_TO:
        logger.warning("Email settings not fully configured. Using mock mode.")
        return True  # Return True in mock mode
    
    # TODO: Implement actual email sending here
    # raise NotImplementedError("Integrate with your email provider")
    
    return True  # Mock success


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'portfolio-contact-api'}), 200


@app.route('/send-email', methods=['POST'])
def send_contact_email():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not all(key in data for key in ['name', 'email', 'message']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        name = data['name']
        email = data['email']
        message = data['message']
        
        # Basic validation
        if len(name) < 2:
            return jsonify({'error': 'Name must be at least 2 characters'}), 400
        
        if '@' not in email or '.' not in email:
            return jsonify({'error': 'Invalid email address'}), 400
        
        if len(message) < 10:
            return jsonify({'error': 'Message must be at least 10 characters'}), 400
        
        # Send email
        success = send_email(name, email, message)
        
        if success:
            logger.info(f"Contact form submission from {name} ({email})")
            return jsonify({
                'message': 'Email sent successfully',
                'success': True
            }), 200
        else:
            logger.error(f"Failed to send email from {name} ({email})")
            return jsonify({'error': 'Failed to send email'}), 500
            
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    logger.info(f"Starting Flask server on port {port}")
    logger.info(f"Debug mode: {debug}")
    
    if not MAIL_PROVIDER_API_KEY:
        logger.warning("MAIL_PROVIDER_API_KEY not set. Email sending will use mock mode.")
    
    app.run(host='0.0.0.0', port=port, debug=debug)
