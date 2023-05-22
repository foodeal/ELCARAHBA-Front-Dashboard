import axios, { AxiosResponse } from 'axios';
import { apiUrl } from './helpers/api-url';
import { ApiUrlsEnum } from './helpers/api-url';
import { UserDetails } from '../models';
import { PrestataireDetails } from '../models/prestataire/prestataire-details';
import { PrestataireDTO } from '../generated/PrestataireDTO';
import { ExpertDTO } from '../generated/ExpertDTO';
import { ExpertData } from '../models/expert/expert';
import { UserDTO } from '../generated/UserDto';
import RequestPerformer from './helpers/request_performer';
// handleResponse


async function getAllUsers(): Promise<UserDetails[]> {
    const onSuccess = (response: AxiosResponse) => {
        return response.data.map((userData: any) => UserDetails.mapToApiValue(userData));
    };

    const onFailure = (error: any) => {
        console.error('Error fetching users:', error);
        return [];
    };

    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllUsers}/`, onSuccess, onFailure);

    return new Promise<UserDetails[]>((resolve, reject) => {
        requestPerformer.performRequest();

        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };

        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    });
}


async function getAllPrestataires(): Promise<PrestataireDTO[]> {
    const onSuccess = (response: AxiosResponse) => {
        return response.data.map((userData: any) => PrestataireDetails.mapToApiValue(userData));
    }
    const onFailure = (error: any) => {
        console.error('Error fetching users:', error);
        return [];
    }
    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllPrestataire}/`, onSuccess, onFailure);
    return new Promise<PrestataireDTO[]>((resolve, reject) => {
        requestPerformer.performRequest();
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };
        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );
}

async function getAllDemandes(): Promise<PrestataireDTO[]> {
    const onSuccess = (response: AxiosResponse) => {
        return response.data.map((userData: any) => PrestataireDetails.mapToApiValue(userData));
    }
    const onFailure = (error: any) => {
        console.error('Error fetching users:', error);
        return [];
    }
    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllPrestataire}/`, onSuccess, onFailure);
    return new Promise<PrestataireDTO[]>((resolve, reject) => {
        requestPerformer.performRequest();
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };
        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );
}

async function getAllExpert(): Promise<ExpertDTO[]> {
    const onSuccess = (response: AxiosResponse) => {
        return response.data.map((userData: any) => ExpertData.mapToApiValue(userData));
    }
    const onFailure = (error: any) => {
        console.error('Error fetching users:', error);
        return [];
    }
    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetAllExperts}/`, onSuccess, onFailure);
    return new Promise<ExpertDTO[]>((resolve, reject) => {
        requestPerformer.performRequest();
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };
        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );
}

async function getUser(id: number): Promise<UserDetails> {
    const onSuccess = (response: AxiosResponse) => UserDetails.mapToApiValue(response.data);
    const onFailure = (error: any) => {
        console.error('Error fetching user:', error);
        return null;
    }
    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetUser}/${id}`, onSuccess, onFailure);
    return new Promise<UserDetails>((resolve, reject) => {
        requestPerformer.performRequest();
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };
        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );
}

async function GetPrestataire(id: number): Promise<PrestataireDTO> {
    const onSuccess = (response: AxiosResponse) => PrestataireDetails.mapToApiValue(response.data);
    const onFailure = (error: any) => {
        console.error('Error fetching user:', error);
        return null;
    }
    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetPrestataire}/${id}`, onSuccess, onFailure);
    return new Promise<PrestataireDTO>((resolve, reject) => {
        requestPerformer.performRequest();
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };
        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );
}

async function getExpert(id: number): Promise<ExpertDTO> {
    const onSuccess = (response: AxiosResponse) => ExpertData.mapToApiValue(response.data);
    const onFailure = (error: any) => {
        console.error('Error fetching user:', error);
        return null;
    }
    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetExpert}/${id}`, onSuccess, onFailure);
    return new Promise<ExpertDTO>((resolve, reject) => {
        requestPerformer.performRequest();
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };
        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );
}

async function getDemande(id: number): Promise<ExpertDTO> {
    const onSuccess = (response: AxiosResponse) => ExpertData.mapToApiValue(response.data);
    const onFailure = (error: any) => {
        console.error('Error fetching user:', error);
        return null;
    }
    const requestPerformer = new RequestPerformer('get', `${apiUrl}/${ApiUrlsEnum.GetPrestataire}/${id}`, onSuccess, onFailure);
    return new Promise<ExpertDTO>((resolve, reject) => {
        requestPerformer.performRequest();
        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };
        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    }
    );
}

// Add user
async function addUser(user: UserDetails): Promise<UserDetails> {
    const onSuccess = (response: AxiosResponse) => {
        return UserDetails.mapToApiValue(response.data);
    };

    const onFailure = (error: any) => {
        console.error('Error adding user:', error);
        return null;
    };

    const requestPerformer = new RequestPerformer('post', `${apiUrl}/${ApiUrlsEnum.Register}`, onSuccess, onFailure);
    requestPerformer.setData(user);

    return new Promise<UserDetails>((resolve, reject) => {
        requestPerformer.performRequest();

        requestPerformer.onSuccess = (response: AxiosResponse) => {
            resolve(response.data);
        };

        requestPerformer.onFailure = (error: any) => {
            reject(error);
        };
    });
}



export default { getAllUsers, getAllPrestataires, getAllExpert, getUser, GetPrestataire, getExpert, getAllDemandes, getDemande };