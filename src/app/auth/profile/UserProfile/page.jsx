"use client"
import { useEffect, useState } from "react";
import { Mail, Phone, User, Calendar, Heart, ChevronDown, CheckCircle, Save, Percent, LogOut } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/redux/features/userSlice";
import axios from "axios";

// Define the initial state for the form data with new fields
const initialFormData = {
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: '',
    maritalStatus: '',
    anniversaryDate: '',
    city: '',
    state: '',
    phone: '',
    email: '',
};

// Reducer function to handle form state changes
const formReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'SET_DATA':
            return action.data;
        case 'RESET':
            return initialFormData;
        default:
            return state;
    }
};

// Custom Input component for consistent styling and labeling
const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, icon: Icon }) => (
    <div className="relative z-0 group w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {Icon && <Icon size={20} />}
        </div>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="block w-full px-10 py-3 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 peer"
        />
        <label htmlFor={name} className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-10 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 pointer-events-none">
            {label}
        </label>
    </div>
);


function UserProfile() {
    const profile = useSelector((state) => state.User); // ✅ Redux state
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(profile || {});
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/api/auth/me", { withCredentials: true });
                if (res.data.authenticated) {
                    setUser(res.data.user);

                    // ✅ also update Redux
                    dispatch(updateProfile(res.data.user));

                    // ✅ also update local form state
                    setFormData(res.data.user);
                } else {
                    router.push("/"); // redirect if not logged in
                }
            } catch (err) {
                router.push("/");
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [router, dispatch]);

    if (loading) return <p className="p-6">Loading...</p>;

    // Calculate profile completion percentage
    const calculateCompletion = () => {
        const totalFields = Object.keys(initialFormData).length;
        const completedFields = Object.values(formData).filter(value => value && value.length > 0 && value !== initialFormData.phone).length;
        return Math.floor(((completedFields + 1) / totalFields) * 100);
    };

    const completionPercentage = calculateCompletion();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    console.log("Redux profile from store:", profile); // ✅ fixed log

    const handleSave = () => {
        setIsSaving(true);
        setIsSaved(false);
        // ✅ Update Redux with form data
        dispatch(updateProfile(formData));
        setIsSaving(false);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
        console.log("Profile saved to Redux:", formData);

        // ✅ Confirmation message box
        const message = "Profile data has been saved in Redux. Check the console for the form data.";
        const messageBox = document.createElement("div");
        messageBox.className = "fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40";
        messageBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-xl border border-gray-200 text-center max-w-sm mx-auto">
        <h3 class="text-lg font-bold mb-2">Save Confirmation</h3>
        <p class="text-gray-600">${message}</p>
        <button id="closeMessageBox" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          OK
        </button>
      </div>
    `;

        document.body.appendChild(messageBox);

        // ✅ Close box on click
        document.getElementById("closeMessageBox").onclick = () => {
            messageBox.remove();
        };
    };


    const FormSelect = ({ label, name, value, options, placeholder = 'Select', icon: Icon }) => (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative flex items-center">
                {Icon && <Icon className="absolute left-3 text-gray-400" size={20} />}
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-colors"
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <svg className="absolute right-3 top-1/2 -mt-2.5 w-5 h-5 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    );



    return (
        <>
            <div className="bg-gray-100 min-h-screen font-sans antialiased text-gray-900">
                <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
                    {/* Left Sidebar */}
                    <div className="md:w-1/4 bg-white p-6 rounded-2xl shadow-md flex-shrink-0">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center p-2 border-2 border-indigo-300">
                                <User className="text-indigo-600" size={60} />
                            </div>
                            <h3 className="text-xl font-bold text-indigo-700">Manisha</h3>
                            <p className="text-sm text-gray-500">Personal Profile</p>
                        </div>
                        <nav className="mt-8 space-y-4">
                            <a href="#" className="flex items-center space-x-4 p-3 rounded-lg text-indigo-600 bg-indigo-50 font-medium hover:bg-indigo-100 transition-colors">
                                <User size={20} />
                                <span>Profile</span>
                            </a>
                            <a href="#" className="flex items-center space-x-4 p-3 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                                <LogOut size={20} />
                                <span>Logout</span>
                            </a>
                        </nav>
                    </div>

                    {/* Main Content Sections */}
                    <div className="md:w-3/4 flex-1 space-y-8">
                        {/* Header */}
                        <header className="flex items-center justify-between">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700">
                                My Profile
                            </h1>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className={`flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                            >
                                <Save size={20} />
                                <span>{isSaving ? 'SAVING...' : 'SAVE'}</span>
                            </button>
                        </header>

                        {/* Profile Completion Card */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl">
                            <div className="flex items-center flex-wrap sm:flex-nowrap">
                                <div className="relative flex-shrink-0 w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-indigo-500 opacity-20 absolute" style={{ transform: `scale(${completionPercentage / 100})` }}></div>
                                    <span className="text-2xl font-bold text-indigo-800 z-10">{completionPercentage}%</span>
                                </div>
                                <div className="ml-4 flex-1 mt-4 sm:mt-0">
                                    <h3 className="text-xl font-bold text-gray-900">Complete your profile</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Share your Email ID to receive booking updates and other critical information.
                                    </p>
                                    <a href="#" className="inline-block mt-2 text-blue-600 font-medium whitespace-nowrap hover:underline">
                                        Add Email
                                    </a>
                                </div>
                            </div>
                            <div className="mt-6 w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-indigo-500 h-2.5 transition-all duration-500 ease-out rounded-full"
                                    style={{ width: `${completionPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Form Sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                            {/* Form Section */}
                            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
                                <section className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2">General Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput
                                            label="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            icon={User}
                                        />
                                        <FormInput
                                            label="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            icon={User}
                                        />
                                        {/* Gender Select */}
                                        <div className="relative z-0 group w-full">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                <ChevronDown size={20} />
                                            </div>
                                            <select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className="block w-full px-10 py-3 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="FEMALE">Female</option>
                                                <option value="MALE">Male</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                            <label htmlFor="gender" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-10 pointer-events-none">
                                                Gender
                                            </label>
                                        </div>
                                        {/* Date of Birth */}
                                        <FormInput
                                            label="Date of Birth"
                                            name="dateOfBirth"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            icon={Calendar}
                                        />
                                        {/* Marital Status Select */}
                                        <div className="relative z-0 group w-full">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                <ChevronDown size={20} />
                                            </div>
                                            <select
                                                name="maritalStatus"
                                                value={formData.maritalStatus}
                                                onChange={handleChange}
                                                className="block w-full px-10 py-3 text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                                            >
                                                <option value="">Select Marital Status</option>
                                                <option value="SINGLE">Single</option>
                                                <option value="MARRIED">Married</option>
                                                <option value="DIVORCED">Divorced</option>
                                                <option value="WIDOWED">Widowed</option>
                                            </select>
                                            <label htmlFor="maritalStatus" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-10 pointer-events-none">
                                                Marital Status
                                            </label>
                                        </div>
                                        {/* Anniversary Date */}
                                        <FormInput
                                            label="Anniversary Date"
                                            name="anniversaryDate"
                                            type="date"
                                            value={formData.anniversaryDate}
                                            onChange={handleChange}
                                            icon={Heart}
                                        />
                                        {/* City */}
                                        <FormInput
                                            label="City"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            icon={Mail}
                                        />
                                        {/* State */}
                                        <FormInput
                                            label="State"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            icon={Mail}
                                        />
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2">Contact Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormInput
                                            label="Mobile Number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            icon={Phone}
                                        />
                                        <FormInput
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            icon={Mail}
                                        />
                                    </div>
                                </section>
                            </div>

                            {/* Saved Data Section */}
                            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
                                <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2">Saved Profile Data</h2>
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    {Object.keys(profile).length > 0 ? (
                                        <pre className="text-sm overflow-auto max-h-96">{JSON.stringify(profile, null, 2)}</pre>
                                    ) : (
                                        <p className="text-gray-500 text-center py-8">No profile data saved yet. Click SAVE to see it here.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Success/Error Message */}
                {isSaved && (
                    <div className="fixed bottom-8 right-8 flex items-center p-4 rounded-xl bg-green-500 text-white shadow-xl animate-fade-in-up">
                        <CheckCircle size={24} className="mr-2" />
                        <span>Profile updated successfully!</span>
                    </div>
                )}
            </div>

            <Footer />
        </>

    );
};

export default UserProfile;
