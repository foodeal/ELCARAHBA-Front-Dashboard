import React, { useState } from 'react';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

function RequestPerformer(method: string, path:string, onSuccess: (response: AxiosResponse) => void, onFailure: (error: any) => void)  {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsImlhdCI6MTY5NzU0NjQyMiwiZXhwIjoxNjk4MTUxMjIyfQ.J7ZY8SzWcHDlzMmCydfV_XttZP-0BxjC1fCjN_SlTG4';

    var data : Record<string, any>;
    const headers = { Accept: 'application/json' };
<<<<<<< Updated upstream
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsImlhdCI6MTY4OTM0Mzg4NCwiZXhwIjoxNjg5OTQ4Njg0fQ.q1QQYPRET6brO3maPlavYMXa8p8EBOVr-nEM31ptfvk";

=======
>>>>>>> Stashed changes
    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${(token)}`;
      }
      return config;
    });

    axios.request({
      method: method,
      url: path,
      headers: {
        ...headers,
      },
      data: data

    })
      .then((response: AxiosResponse) => {
        onSuccess(response);
      })
      .catch((error: any) => {
        onFailure(error);
      });
}

export default RequestPerformer;
