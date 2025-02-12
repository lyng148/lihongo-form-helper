# Lihongo Form Helper

## Overview
Lihongo Form Helper is a Chrome extension designed to automate form filling using Google's Gemini AI API. The extension specifically targets Google Forms and employs advanced natural language processing to intelligently analyze and complete form fields.




### Key Features
- Automatic form field detection and classification
- AI-powered response generation
- Support for multiple question types:
    - Text input fields
    - Radio button selections
    - Checkbox groups
- Temporary disable/enable functionality
- API connection testing
- Secure API key management

## Installation

### Prerequisites
- Google Chrome Browser
- Gemini AI API key from Google AI Studio

### Installation Steps
1. Clone the repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the extension directory

## Configuration

### API Key Setup
1. Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. Generate a new API key
3. Open the extension popup
4. Enter the API key in the designated field
5. Click "Save API Key"

### Extension Settings
- **Temporary Disable**: Toggle switch to temporarily disable the extension
- **API Testing**: Verify API key functionality using the "Test API" button



## Security Considerations

### API Key Storage
- Utilizes Chrome's secure storage API
- Keys are synced across user's Chrome instances
- No local storage of sensitive data

### Data Processing
- All processing occurs client-side
- No external data transmission except to Gemini AI
- Form data remains within the browser context

## Limitations
1. Only supports Google Forms platform
2. Requires active internet connection
3. Subject to Gemini AI API rate limits
4. May require manual verification of AI-generated responses

## Troubleshooting

### Common Issues
1. **API Key Invalid**
    - Verify key in Google AI Studio
    - Check for proper key format
    - Test connection using popup interface

2. **Form Detection Failures**
    - Ensure form is fully loaded
    - Check for custom form elements
    - Verify DOM structure matches expected patterns

3. **Response Generation Issues**
    - Check API quota limits
    - Verify network connectivity
    - Ensure question format is compatible

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes with descriptive messages
4. Submit pull request with detailed description

## Version History
- 1.0.0: Initial release
    - Basic form filling functionality
    - Gemini AI integration
    - User interface implementation

## Acknowledgments
- Google Gemini AI team for API access
- Chrome Extensions documentation
