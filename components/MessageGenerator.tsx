/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react';
import Toast from './Toast';

interface InputData {
  id?: number;
  name?: string;
  job_title?: string;
  linkedin_url?: string;
  company?: string;
  company_website?: string;
  company_linkedin?: string;
  company_facebook?: string;
  company_twitter?: string;
  location?: string;
  industry?: string;
}

const MessageGenerator: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [linkedInMessage, setLinkedInMessage] = useState<string>('Your LinkedIn message will appear here.');
  const [connectionNote, setConnectionNote] = useState<string>('Your connection note will appear here.');
  const [twitterMessage, setTwitterMessage] = useState<string>('Your Twitter message will appear here.');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [linkedinUrl, setLinkedinUrl] = useState<string>('');
  const [twitterUrl, setTwitterUrl] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const generateMessages = () => {
    try {
      const data: InputData = jsonInput ? JSON.parse(jsonInput) : {};

      // Set the URLs
      setLinkedinUrl(data.linkedin_url || '');
      setTwitterUrl(data.company_twitter || '');

      // Determine name to use
      const nameToUse = userName.trim() || "Your Name";
      const companyToUse = data.company || "Company Name";
      const jobTitleToUse = data.job_title || "Job Title";
      const industryToUse = data.industry || "Industry";
      const personName = data.name || "Name";

      // LinkedIn Message
      const linkedInMessage = `Hello ${personName},

I hope you are doing well! I came across your profile and noticed your role as ${jobTitleToUse} at ${companyToUse}. I am highly interested in the ${industryToUse} sector and would love to connect with someone as experienced as you in the industry.

Looking forward to connecting with you on LinkedIn: ${data.linkedin_url || "LinkedIn URL"}

Best regards,
${nameToUse}`;

      // LinkedIn Connection Note
      const connectionNote = `Hi ${personName}, I noticed your experience as a ${jobTitleToUse} at ${companyToUse}. I’m really interested in your work in ${industryToUse} and would love to connect!`;

      // Twitter Message
      const twitterMessage = `Hi ${personName}, I came across your role at ${companyToUse} and your experience in ${industryToUse}. I’d love to connect and follow your updates!`;

      setLinkedInMessage(linkedInMessage);
      setConnectionNote(connectionNote);
      setTwitterMessage(twitterMessage);
    } catch (error) {
      setLinkedInMessage('Invalid JSON format. Please check your input.');
      setConnectionNote('Invalid JSON format. Please check your input.');
      setTwitterMessage('Invalid JSON format. Please check your input.');
      setLinkedinUrl('');
      setTwitterUrl('');
    }
  };

  const copyToClipboard = (message: string) => {
    navigator.clipboard.writeText(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // Hide toast after 3 seconds
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white text-black rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Custom Message Generator</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Your Name</label>
        <input
          type="text"
          value={userName}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
        />
      </div>
      
      <textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter JSON data here"
        rows={8}
        className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black mb-4"
      ></textarea>
      
      <button
        onClick={generateMessages}
        className="w-full bg-blue-500 text-black py-2 rounded-lg hover:bg-blue-600 transition mb-4"
      >
        Generate Messages
      </button>

      {/* Information Box */}
      <div className="bg-gray-200 p-4 rounded-lg mb-4">
        <h3 className="font-bold mb-2">Expected JSON Format:</h3>
        <pre className="text-sm text-gray-700">
          {`{
  "name": "Your Name",
  "job_title": "Your Job Title",
  "linkedin_url": "http://www.linkedin.com/in/yourprofile",
  "company": "Your Company Name",
  "company_twitter": "http://www.twitter.com/yourcompany"
}`}
        </pre>
      </div>

      {/* Right Section: Message Boxes */}
      <div className="flex space-x-6">
        {/* Message Boxes */}
        <div className="flex-1 space-y-4">
          {/* Message Container for Side by Side Display */}
          <div className="flex space-x-6">
            {/* LinkedIn Message */}
            <div className="bg-gray-100 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold mb-2">LinkedIn Message</h2>
              <p>{linkedInMessage}</p>
              <p className="text-sm text-blue-600">
                LinkedIn URL: <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">{linkedinUrl || "No URL Provided"}</a>
              </p>
              <button
                onClick={() => copyToClipboard(linkedInMessage)}
                className="mt-2 bg-green-500 text-black py-1 px-2 rounded-lg hover:bg-green-600 transition"
              >
                Copy LinkedIn Message
              </button>
            </div>

            {/* LinkedIn Connection Note */}
            <div className="bg-gray-100 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold mb-2">LinkedIn Connection Note</h2>
              <p>{connectionNote}</p>
              <button
                onClick={() => copyToClipboard(connectionNote)}
                className="mt-2 bg-green-500 text-black py-1 px-2 rounded-lg hover:bg-green-600 transition"
              >
                Copy Connection Note
              </button>
            </div>
          </div>

          {/* Twitter Message */}
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Twitter Message</h2>
            <p>{twitterMessage}</p>
            <p className="text-sm text-blue-600">
              Twitter URL: <a href={twitterUrl} target="_blank" rel="noopener noreferrer">{twitterUrl || "No URL Provided"}</a>
            </p>
            <button
              onClick={() => copyToClipboard(twitterMessage)}
              className="mt-2 bg-green-500 text-black py-1 px-2 rounded-lg hover:bg-green-600 transition"
            >
              Copy Twitter Message
            </button>
          </div>
        </div>
      </div>

      {/* Toast component */}
      <Toast message="Message copied successfully!" visible={toastVisible} />
    </div>
  );
}

export default MessageGenerator;
