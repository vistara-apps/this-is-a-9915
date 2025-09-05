import React, { useState } from 'react';
import { FileText, Calendar, MapPin, User, Save, AlertCircle } from 'lucide-react';

const IncidentRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [incident, setIncident] = useState({
    timestamp: '',
    location: '',
    officerInfo: '',
    description: '',
    witnesses: ''
  });
  const [savedReports, setSavedReports] = useState([]);

  const handleInputChange = (field, value) => {
    setIncident(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveReport = () => {
    if (!incident.timestamp || !incident.location || !incident.description) {
      alert('Please fill in all required fields');
      return;
    }

    const newReport = {
      id: Date.now(),
      ...incident,
      createdAt: new Date().toISOString()
    };

    setSavedReports(prev => [newReport, ...prev]);
    setIncident({
      timestamp: '',
      location: '',
      officerInfo: '',
      description: '',
      witnesses: ''
    });
    setIsRecording(false);
    alert('Incident report saved successfully');
  };

  const startNewReport = () => {
    setIsRecording(true);
    setIncident(prev => ({
      ...prev,
      timestamp: new Date().toISOString().slice(0, 16)
    }));
  };

  return (
    <div className="bg-surface rounded-lg shadow-card p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <FileText className="h-6 w-6 text-primary" />
        <h2 className="text-h2 text-text-primary">Document Incident</h2>
      </div>
      
      <p className="text-body text-text-secondary mb-6">
        Quickly record details of police encounters for your records and potential legal action.
      </p>
      
      {!isRecording ? (
        <div className="text-center py-8">
          <button
            onClick={startNewReport}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Start New Report
          </button>
          
          {savedReports.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Saved Reports ({savedReports.length})</h3>
              <div className="space-y-3">
                {savedReports.slice(0, 3).map(report => (
                  <div key={report.id} className="p-4 bg-gray-50 rounded-lg text-left">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">
                        {new Date(report.timestamp).toLocaleString()}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">{report.location}</p>
                    <p className="text-sm text-text-primary mt-1 truncate">{report.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Date & Time *
              </label>
              <input
                type="datetime-local"
                value={incident.timestamp}
                onChange={(e) => handleInputChange('timestamp', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location *
              </label>
              <input
                type="text"
                value={incident.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Street address or intersection"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Officer Information
            </label>
            <input
              type="text"
              value={incident.officerInfo}
              onChange={(e) => handleInputChange('officerInfo', e.target.value)}
              placeholder="Badge number, name, patrol car number, etc."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description of Incident *
            </label>
            <textarea
              value={incident.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detailed description of what happened..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Witnesses
            </label>
            <input
              type="text"
              value={incident.witnesses}
              onChange={(e) => handleInputChange('witnesses', e.target.value)}
              placeholder="Names and contact information of witnesses"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-700">
                This information is stored locally on your device. Consider sharing with trusted contacts or legal counsel.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={handleSaveReport}
              className="flex items-center justify-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              <Save className="h-4 w-4" />
              <span>Save Report</span>
            </button>
            <button
              onClick={() => setIsRecording(false)}
              className="px-6 py-3 border border-gray-300 text-text-primary rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentRecorder;