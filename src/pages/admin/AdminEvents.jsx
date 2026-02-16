import React, { useState } from 'react';
import { events as initialEvents } from '../../data/events';

export default function AdminEvents() {
    const [eventsList, setEventsList] = useState(initialEvents);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState({ title: '', category: '', date: '', price: '', image: '', description: '' });

    const openAddModal = () => {
        setIsEditing(false);
        setCurrentEvent({ title: '', category: '', date: '', price: '', image: '', description: '' });
        setShowModal(true);
    };

    const openEditModal = (event) => {
        setIsEditing(true);
        setCurrentEvent(event);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            setEventsList(eventsList.filter(e => e.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setEventsList(eventsList.map(e => e.id === currentEvent.id ? currentEvent : e));
        } else {
            const newEvent = {
                ...currentEvent,
                id: eventsList.length > 0 ? Math.max(...eventsList.map(e => e.id)) + 1 : 1
            };
            setEventsList([...eventsList, newEvent]);
        }
        closeModal();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentEvent({ ...currentEvent, [name]: value });
    };

    return (
        <div className="admin-page-content animate-fade-in">
            <header className="admin-content-header">
                <div>
                    <h1 className="admin-title">Events Management</h1>
                    <p className="admin-subtitle">Create and manage your exclusive events</p>
                </div>
                <button className="admin-add-btn" onClick={openAddModal}>+ CREATE EVENT</button>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>EVENT</th>
                            <th>CATEGORY</th>
                            <th>DATE</th>
                            <th>PRICE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventsList.map((event) => (
                            <tr key={event.id}>
                                <td>
                                    <div className="table-item-main">
                                        <span className="item-name">{event.title}</span>
                                    </div>
                                </td>
                                <td><span className="table-badge">{event.category}</span></td>
                                <td>{event.date}</td>
                                <td><span className="table-price">${event.price}</span></td>
                                <td>
                                    <div className="table-actions">
                                        <button className="icon-btn edit" onClick={() => openEditModal(event)}>✏️</button>
                                        <button className="icon-btn delete" onClick={() => handleDelete(event.id)}>🗑️</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h2>{isEditing ? 'Edit Event' : 'Create New Event'}</h2>
                            <button className="close-modal" onClick={closeModal}>&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form">
                                    <div className="form-group full">
                                        <label>Event Name</label>
                                        <input
                                            name="title"
                                            value={currentEvent.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter event name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            name="category"
                                            value={currentEvent.category}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Concert">Concert</option>
                                            <option value="Dining">Dining</option>
                                            <option value="Exhibition">Exhibition</option>
                                            <option value="Gala">Gala</option>
                                            <option value="Music">Music</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Price ($)</label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={currentEvent.price}
                                            onChange={handleInputChange}
                                            placeholder="250"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input
                                            name="date"
                                            value={currentEvent.date}
                                            onChange={handleInputChange}
                                            placeholder="Oct 24, 2026"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL</label>
                                        <input
                                            name="image"
                                            value={currentEvent.image}
                                            onChange={handleInputChange}
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                    <div className="form-group full">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            value={currentEvent.description}
                                            onChange={handleInputChange}
                                            placeholder="Describe the event..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn-secondary" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="admin-btn-primary">
                                    {isEditing ? 'Save Changes' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
