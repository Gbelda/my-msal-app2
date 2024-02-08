import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getUserIdAsync } from './app/auth/msalProvider';


function Main() {

  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getUserIdAsync();
        setUserId(id || ''); // Ensure userId is a string
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, []); // Empty dependency array ensures the effect runs only once on mount


  useEffect(() => {
    console.log('userId:', userId);
  }, [userId]);


  return (
    <>
      {userId !== '' ? <RedirectUser userId={userId} /> : <LoadingScreen />}
    </>

  )
}


const RedirectUser = ({ userId }: { userId: string }) => {
  const azurePortalUrl = "webappmsal1.azurewebsites.net";

  const urlParams = new URLSearchParams(window.location.search);
  const param1 = urlParams.get('param1');
  const param2 = urlParams.get('param2');

  useEffect(() => {
    const shouldRedirect = userId !== "GIOVANNIMELVILLE.BELDA@emea.nttdata.com";
    if (shouldRedirect) {
      window.location.href = azurePortalUrl;
    }
  }, [userId, azurePortalUrl]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          THIS IS APP 2
          {
            !!param1 && !!param2 ?
              <div>
                <p>QUERY DATA</p>
                <p>param1 : {param1}</p>
                <p>param2 : {param2}</p>
              </div>
              : ''
          }
        </p>
      </header>
    </div>
  );
};

const LoadingScreen = () => <div>Loading...</div>;

export default Main