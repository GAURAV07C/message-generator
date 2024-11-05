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
  const [companyLinkedInMessage, setCompanyLinkedInMessage] = useState<string>('Your Company LinkedIn message will appear here.');
  const [companyConnectionNote, setCompanyConnectionNote] = useState<string>('Your Company connection note will appear here.');
  const [companyTwitterMessage, setCompanyTwitterMessage] = useState<string>('Your Company Twitter message will appear here.');
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [linkedinUrl, setLinkedinUrl] = useState<string>('');
  const [twitterUrl, setTwitterUrl] = useState<string>('');
  const [companyLinkedinUrl, setCompanyLinkedinUrl] = useState<string>('');
  const [companyTwitterUrl, setCompanyTwitterUrl] = useState<string>('');
  const [normal, setNormal] = useState<string>('');
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
      setCompanyLinkedinUrl(data.company_linkedin || '');
      setCompanyTwitterUrl(data.company_twitter || '');

      const nameToUse = userName.trim() || "Your Name";
      const companyToUse = data.company || "Company Name";
      const jobTitleToUse = data.job_title || "Job Title";
      const industryToUse = data.industry || "Industry";
      const personName = data.name || "Name";

      const normalMessage = `Hey Gaurav ${userName} you are generating data for ${companyToUse}`

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

      // Company LinkedIn Message
      const companyLinkedInMessage = `Hello ${companyToUse} team,

I hope you are doing well! I came across your profile and noticed your role as ${jobTitleToUse} at ${companyToUse}. I am highly interested in the ${industryToUse} sector and would love to connect with someone as experienced as you in the industry.

Looking forward to connecting with you on LinkedIn: ${data.company_linkedin || "Company LinkedIn URL"}

Best regards,
${nameToUse}`;

      // Company Connection Note
      const companyConnectionNote = `Hi ${companyToUse}, I noticed your experience in ${industryToUse}. I’m really interested in your work and would love to connect!`;

      // Company Twitter Message
      const companyTwitterMessage = `Hi ${companyToUse}, I came across your role and your experience in ${industryToUse}. I’d love to connect and follow your updates!`;
      setNormal(normalMessage)
      setLinkedInMessage(linkedInMessage);
      setConnectionNote(connectionNote);
      setTwitterMessage(twitterMessage);
      setCompanyLinkedInMessage(companyLinkedInMessage);
      setCompanyConnectionNote(companyConnectionNote);
      setCompanyTwitterMessage(companyTwitterMessage);
    } catch (error) {
      console.error('Error parsing JSON:', error); // Log the error for debugging
      setLinkedInMessage('Invalid JSON format. Please check your input.');
      setConnectionNote('Invalid JSON format. Please check your input.');
      setTwitterMessage('Invalid JSON format. Please check your input.');
      setCompanyLinkedInMessage('Invalid JSON format. Please check your input.');
      setCompanyConnectionNote('Invalid JSON format. Please check your input.');
      setCompanyTwitterMessage('Invalid JSON format. Please check your input.');
      setLinkedinUrl('');
      setTwitterUrl('');
      setCompanyLinkedinUrl('');
      setCompanyTwitterUrl('');
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
      <div className='px-2 py-2 border-2 bg-slate-700 text-gray-200 mx-auto rounded-lg'>

      <p >{normal} </p>
      </div>
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

      {/* Expected JSON Format Box */}
      <div className="bg-gray-200 p-4 rounded-lg mb-4">
        <h3 className="font-bold mb-2">Expected JSON Format:</h3>
        <pre className="text-sm text-gray-700">
          {`{
  "name": "Your Name",
  "job_title": "Your Job Title",
  "linkedin_url": "http://www.linkedin.com/in/yourprofile",
  "company": "Your Company Name",
  "company_twitter": "http://www.twitter.com/yourcompany",
  "company_linkedin": "http://www.linkedin.com/company/yourcompany"
}`}
        </pre>
      </div>

      {/* Message Display Section */}
      <div className=" space-x-6">
        {/* User Messages */}
        <div className="flex-1 space-y-4">
          <div className="flex space-x-6">
            <div className="bg-gray-100 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold mb-2">LinkedIn Message</h2>
              <p className="text-sm text-blue-600 mb-5">
                LinkedIn URL: <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">{linkedinUrl}</a>
              </p>
              <p>{linkedInMessage}</p>
              <button onClick={() => copyToClipboard(linkedInMessage)} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">Copy</button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold mb-2">Connection Note</h2>
              <p>{connectionNote}</p>
              <button onClick={() => copyToClipboard(connectionNote)} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">Copy</button>
            </div>
          </div>
          <div className="flex space-x-6">
            <div className="bg-gray-100 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold mb-2">Twitter Message</h2>
              <p className="text-sm text-blue-600 mb-5">
                Twitter URL: <a href={twitterUrl} target="_blank" rel="noopener noreferrer">{twitterUrl}</a>
              </p>
              <p>{twitterMessage}</p>
              <button onClick={() => copyToClipboard(twitterMessage)} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">Copy</button>
            </div>
          </div>
        </div>

        {/* Company Messages */}
        <div className="flex-1 space-y-4">
          <div className="flex space-x-6">
            <div className="bg-gray-100 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold mb-2">Company LinkedIn Message</h2>
              <p className="text-sm text-blue-600 mb-5">
                Company LinkedIn URL: <a href={companyLinkedinUrl} target="_blank" rel="noopener noreferrer">{companyLinkedinUrl}</a>
              </p>
              <p>{companyLinkedInMessage}</p>
              <button onClick={() => copyToClipboard(companyLinkedInMessage)} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">Copy</button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold mb-2">Company Connection Note</h2>
              <p>{companyConnectionNote}</p>
              <button onClick={() => copyToClipboard(companyConnectionNote)} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">Copy</button>
            </div>
          </div>
          <div className="flex space-x-6">
            <div className="bg-gray-100 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold mb-2">Company Twitter Message</h2>
              <p className="text-sm text-blue-600 mb-5">
                Company Twitter URL: <a href={companyTwitterUrl} target="_blank" rel="noopener noreferrer">{companyTwitterUrl}</a>
              </p>
              <p>{companyTwitterMessage}</p>
              <button onClick={() => copyToClipboard(companyTwitterMessage)} className="mt-2 bg-blue-500 text-white py-1 px-3 rounded">Copy</button>
            </div>
          </div>
        </div>
      </div>

      <Toast visible={toastVisible} message="Copied to clipboard!" />
    </div>
  );
};

export default MessageGenerator;
