import React, { useState } from 'react';
import { User, Edit, Save, X, Camera, MapPin, Phone, Mail } from 'lucide-react';
import { User as UserType } from '../../types';

interface ProfileProps {
    user: UserType;
    onUpdateProfile: (updatedUser: UserType) => void;
    onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateProfile, onBack }) => {
    // Add null check for user
    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">User not found</h1>
                    <button
                        onClick={onBack}
                        className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
    });

    // Update form data when user changes
    React.useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
            });
        }
    }, [user]);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (file) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    alert('Please select an image file');
                    return;
                }

                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Image size should be less than 5MB');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    setProfileImage(e.target?.result as string);
                };
                reader.onerror = () => {
                    console.error('Error reading file');
                    alert('Error reading image file');
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image');
        }
    };

    const handleSave = () => {
        try {
            const updatedUser: UserType = {
                ...user,
                ...formData
            };
            onUpdateProfile(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            // You could add a toast notification here
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center text-orange-600 hover:text-orange-700 mb-4 transition-colors"
                    >
                        <X className="h-5 w-5 mr-2" />
                        Back
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                    <p className="text-gray-600 mt-2">Manage your account information</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-12 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                                        {profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="w-24 h-24 rounded-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-12 h-12 text-white" />
                                        )}
                                    </div>
                                    {isEditing && (
                                        <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer shadow-lg">
                                            <Camera className="w-4 h-4 text-orange-600" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{user.name}</h2>
                                    <p className="text-orange-100 flex items-center">
                                        <User className="w-4 h-4 mr-2" />
                                        {user.type === 'recruiter' ? 'Recruiter' : 'Worker'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isEditing
                                    ? 'bg-white/20 hover:bg-white/30'
                                    : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                {isEditing ? (
                                    <>
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    Personal Information
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Enter your full name"
                                            />
                                        ) : (
                                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <User className="w-5 h-5 text-gray-400 mr-3" />
                                                <span className="text-gray-900">{user.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Enter your email"
                                            />
                                        ) : (
                                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <Mail className="w-5 h-5 text-gray-400 mr-3" />
                                                <span className="text-gray-900">{user.email}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Enter your phone number"
                                            />
                                        ) : (
                                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <Phone className="w-5 h-5 text-gray-400 mr-3" />
                                                <span className="text-gray-900">{user.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                                    Account Information
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            User ID
                                        </label>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <User className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="text-gray-900 font-mono text-sm">{user.id}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Account Type
                                        </label>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <User className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="text-gray-900 capitalize">{user.type}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Member Since
                                        </label>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                                            <span className="text-gray-900">Active Member</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {isEditing && (
                                    <div className="flex space-x-4 pt-6">
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center"
                                        >
                                            <X className="w-4 h-4 mr-2" />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 