import { useContext, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

import { Input } from 'src/components';

import { ConfigContext, PlatformContext } from 'src/context';

import { saveConfig } from 'src/utils/files';

import FlowerLogo from 'src/assets/flower.svg';
import FlowerLoading from 'src/assets/flower-loading.svg';

const MIN_PASSWORD_LENGTH = 8;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  cancel: () => void;
}

const SignupForm = ({ setPassword, cancel }: Props) => {
  const { config, setConfigFile } = useContext(ConfigContext);
  const { platform } = useContext(PlatformContext);
  const [isLoading, setIsLoading] = useState(false);
  const [localPassword, setLocalPassword] = useState('');
  const [localConfirmPassword, setLocalConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const history = useHistory();

  const validateInput = () => {
    if (!!localPassword && localPassword.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
      return false;
    } else if (!!passwordError) {
      setPasswordError('');
    }

    if (!!localPassword && !!localConfirmPassword && localPassword !== localConfirmPassword) {
      setConfirmPasswordError("Password doesn't match confirmation");
      return false;
    } else {
      setPasswordError('');
      setConfirmPasswordError('');
      return true;
    }
  };

  const createNewConfig = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      if (validateInput()) {
        const configCopy = { ...config };
        configCopy.isEmpty = false;
        setTimeout(() => {
          setConfigFile(configCopy);
          saveConfig(configCopy, localPassword, platform); // we save a blank config file
          setPassword(localPassword);
          setIsLoading(false);
          history.replace(`/`);
        }, 2000);
      }
    } catch (e) {
      setPasswordError('Error. Try again.');
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const changeLocalPassword = (value: string) => {
    setPasswordError('');
    setLocalPassword(value);
  };

  const changeConfirmPassword = (value: string) => {
    setConfirmPasswordError('');
    setLocalConfirmPassword(value);
  };

  return (
    <div className='mx-auto w-full max-w-sm lg:w-96'>
      <div>
        <img className='h-12 w-auto' src={FlowerLogo} alt='Lily Wallet logo' />
        <h2 className='mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-200'>
          Create a new wallet
        </h2>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-500'>
          Use a password to encrypt your wallet so others cannot access it.
        </p>
      </div>
      <div className='mt-8'>
        <div className='mt-6'>
          <form onSubmit={createNewConfig} className='space-y-6'>
            <div className='space-y-1'>
              <Input
                label='Password'
                type='password'
                value={localPassword}
                onChange={changeLocalPassword}
                error={passwordError}
                autoComplete='new-password'
                required
              />
            </div>
            <div className='space-y-1'>
              <Input
                label='Confirm password'
                type='password'
                value={localConfirmPassword}
                onChange={changeConfirmPassword}
                error={confirmPasswordError}
                autoComplete='new-password'
                required
              />
            </div>

            <div className='flex justify-end'>
              <button
                type='button'
                onClick={cancel}
                className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-green-500'
              >
                Cancel
              </button>

              <button
                type='submit'
                className='ml-3 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2  focus:ring-green-500'
              >
                {isLoading && <LoadingImage alt='loading placeholder' src={FlowerLoading} />}
                {isLoading ? 'Creating wallet...' : 'Create wallet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const LoadingImage = styled.img`
  filter: brightness(0) invert(1);
  max-width: 1.25em;
  margin-left: 0.25em;
  opacity: 0.9;
  margin-right: 0.5em;
`;

export default SignupForm;
