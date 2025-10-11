

export const signUpUser = ({
    email,
    password,
    }: {
    email: string;
    password: string;
    }): Promise<Response> => {
    const myHeaders = new Headers();
    myHeaders.append('rid', 'emailpassword');
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
        formFields: [
        { id: 'email', value: email },
        { id: 'password', value: password },
        ],
    });
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    return fetch('https://apiv1.rescua.eu/auth/signup', requestOptions);
  };