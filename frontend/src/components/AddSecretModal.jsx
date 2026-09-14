import { useState } from 'react';

import {
  X,
  KeyRound,
  Link,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';

import api from '../services/api';

import './AddSecretModal.css';


function AddSecretModal({ onClose, onCreated }) {

  const [type, setType] = useState('Password');

  const [formData, setFormData] = useState({
    title: '',
    username: '',
    website: '',
    secret: ''
  });

  const [showSecret, setShowSecret] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');


  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

    setError('');

  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setLoading(true);
      setError('');

      await api.post('/vault', {
        title: formData.title,
        type: type,
        username: formData.username,
        website: formData.website,
        secret: formData.secret
      });

      onCreated();

      onClose();

    } catch (err) {

      console.error('Failed to create vault item:', err);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError(
          'Unable to save secret. Please try again.'
        );
      }

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="modal-overlay">

      <div className="add-secret-modal">


        {/* HEADER */}

        <div className="modal-header">

          <div>

            <span className="modal-label">
              SECURE STORAGE
            </span>

            <h2>Add Secret</h2>

            <p>
              Store a new secret inside your vault.
            </p>

          </div>


          <button
            className="modal-close"
            onClick={onClose}
          >
            <X size={19} />
          </button>

        </div>


        {/* TYPE SELECTOR */}

        <div className="secret-types">

          <button
            type="button"
            className={
              type === 'Password'
                ? 'secret-type active'
                : 'secret-type'
            }
            onClick={() => setType('Password')}
          >

            <KeyRound size={17} />

            <span>Password</span>

          </button>


          <button
            type="button"
            className={
              type === 'API Key'
                ? 'secret-type active'
                : 'secret-type'
            }
            onClick={() => setType('API Key')}
          >

            <Link size={17} />

            <span>API Key</span>

          </button>


          <button
            type="button"
            className={
              type === 'Note'
                ? 'secret-type active'
                : 'secret-type'
            }
            onClick={() => setType('Note')}
          >

            <FileText size={17} />

            <span>Note</span>

          </button>

        </div>


        {/* FORM */}

        <form onSubmit={handleSubmit}>


          {/* TITLE */}

          <div className="modal-form-group">

            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder={
                type === 'Password'
                  ? 'e.g. GitHub'
                  : type === 'API Key'
                    ? 'e.g. OpenWeather API'
                    : 'e.g. Wi-Fi Password'
              }
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>


          {/* USERNAME */}

          {type !== 'Note' && (

            <div className="modal-form-group">

              <label>
                Username
                <span>Optional</span>
              </label>

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />

            </div>

          )}


          {/* WEBSITE */}

          {type !== 'Note' && (

            <div className="modal-form-group">

              <label>
                Website
                <span>Optional</span>
              </label>

              <input
                type="text"
                name="website"
                placeholder="https://example.com"
                value={formData.website}
                onChange={handleChange}
              />

            </div>

          )}


          {/* SECRET */}

          <div className="modal-form-group">

            <label>
              {type === 'Note'
                ? 'Secret Note'
                : type}
            </label>

            <div className="secret-input">

              <input
                type={showSecret ? 'text' : 'password'}
                name="secret"
                placeholder={
                  type === 'Password'
                    ? 'Enter password'
                    : type === 'API Key'
                      ? 'Enter API key'
                      : 'Enter your private note'
                }
                value={formData.secret}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowSecret(!showSecret)
                }
              >

                {showSecret
                  ? <EyeOff size={17} />
                  : <Eye size={17} />
                }

              </button>

            </div>

          </div>


          {/* ERROR */}

          {error && (

            <div className="modal-error">
              {error}
            </div>

          )}


          {/* ACTIONS */}

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="save-secret-button"
              disabled={loading}
            >

              {loading
                ? 'Saving...'
                : 'Save Secret'}

            </button>

          </div>

        </form>

      </div>

    </div>

  );
}


export default AddSecretModal;