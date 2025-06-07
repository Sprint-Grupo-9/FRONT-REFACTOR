const USER_PROFILE_KEY = "userProfile";
const PET_PROFILE_KEY = "petProfile";

export const saveUserProfile = (data) => {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(data));
};

export const loadUserProfile = () => {
    const stored = localStorage.getItem(USER_PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
};

export const clearUserProfile = () => {
    localStorage.removeItem(USER_PROFILE_KEY);
};

export const savePetProfile = (data) => {
    localStorage.setItem(PET_PROFILE_KEY, JSON.stringify(data));
};

export const loadPetProfile = () => {
    const stored = localStorage.getItem(PET_PROFILE_KEY);
    return stored ? JSON.parse(stored) : null;
};

export const clearPetProfile = () => {
    localStorage.removeItem(PET_PROFILE_KEY);
};