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


function EditSecretModal({ item, onClose, onUpdated }) {

  const [type, setType] = useState(item.type);

  const [formData, setFormData] = useState({
    title: item.title || '',
    username: item.username || '',
    website: item.website || '',
    secret: item.secret || ''
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

      await api.put(`/vault/${item.id}`, {
        title: formData.title,
        type: type,
        username: formData.username,
        website: formData.website,
        secret: formData.secret
      });

      onUpdated();

      onClose();

    } catch (err) {

      console.error('Failed to update vault item:', err);

      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError(
          'Unable to update secret. Please try again.'
        );
      }

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="modal-overlay">

      <div className="add-secret-modal">

        <div className="modal-header">

          <div>

            <span className="modal-label">
              SECURE STORAGE
            </span>

            <h2>Edit Secret</h2>

            <p>
              Update your encrypted vault item.
            </p>

          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            <X size={19} />
          </button>

        </div>


        {/* SECRET TYPE */}

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


        <form onSubmit={handleSubmit}>

          {/* TITLE */}

          <div className="modal-form-group">

            <label>Title</label>

            <input
              type="text"
              name="title"
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
                ? 'Updating...'
                : 'Update Secret'}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}


export default EditSecretModal;