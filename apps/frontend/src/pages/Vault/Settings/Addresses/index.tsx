import React, { useState } from 'react';

import AddressRow from './AddressRow';

import { requireOnchain } from 'src/hocs';

import { SettingsTable } from 'src/components';
import { LilyOnchainAccount } from '@lily/types';

import { SearchToolbar } from 'src/pages/Send/components/SelectInputsForm/SearchToolbar';

import { classNames } from 'src/utils/other';

interface Props {
  currentAccount: LilyOnchainAccount;
}

const tabs = ['Receive', 'Change'];

const AddressesView = ({ currentAccount }: Props) => {
  const { addresses, unusedAddresses, changeAddresses, unusedChangeAddresses } = currentAccount;
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <SettingsTable.HeaderSection>
        <SettingsTable.HeaderTitle>Addresses Information</SettingsTable.HeaderTitle>
        <SettingsTable.HeaderSubtitle>
          These are the addresses associated with this account.
        </SettingsTable.HeaderSubtitle>
      </SettingsTable.HeaderSection>

      <div className='border-b border-gray-200 dark:border-slate-700'>
        <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
          {tabs.map((tab) => (
            <a
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={classNames(
                activeTab === tab
                  ? 'border-yellow-500 text-gray-900 dark:text-slate-100'
                  : 'border-transparent text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 hover:border-gray-300',
                'cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              )}
              aria-current={activeTab === tab ? 'page' : undefined}
            >
              {tab}
            </a>
          ))}
        </nav>
      </div>

      <div className=''>
        <SearchToolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className='my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden sm:rounded-lg'>
            <table className='border-collapse w-full'>
              <tbody className='divide-y dark:divide-slate-400/10'>
                {activeTab === 'Receive' ? (
                  <>
                    <tr className='border-t border-gray-200 dark:border-slate-700'>
                      <th
                        colSpan={5}
                        scope='colgroup'
                        className='bg-gray-50 dark:bg-slate-700 dark:text-slate-300 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6'
                      >
                        Unused
                      </th>
                    </tr>
                    {unusedAddresses.map((address) => (
                      <AddressRow
                        key={address.address}
                        address={address}
                        searchQuery={searchQuery}
                        used={false}
                      />
                    ))}
                  </>
                ) : null}

                {activeTab === 'Receive' ? (
                  <>
                    <tr className='border-t border-gray-200 dark:border-slate-700'>
                      <th
                        colSpan={5}
                        scope='colgroup'
                        className='bg-gray-50 dark:bg-slate-700 dark:text-slate-300 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6'
                      >
                        Used
                      </th>
                    </tr>
                    {addresses.map((address) => (
                      <AddressRow
                        key={address.address}
                        address={address}
                        searchQuery={searchQuery}
                        used={true}
                      />
                    ))}
                  </>
                ) : null}
                {activeTab === 'Change' ? (
                  <>
                    <tr className='border-t border-gray-200 dark:border-slate-700'>
                      <th
                        colSpan={5}
                        scope='colgroup'
                        className='bg-gray-50 dark:bg-slate-700 dark:text-slate-300 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6'
                      >
                        Unused
                      </th>
                    </tr>
                    {unusedChangeAddresses.map((address) => (
                      <AddressRow
                        key={address.address}
                        address={address}
                        searchQuery={searchQuery}
                        used={false}
                      />
                    ))}
                  </>
                ) : null}

                {activeTab === 'Change' ? (
                  <>
                    <tr className='border-t border-gray-200 dark:border-slate-700'>
                      <th
                        colSpan={5}
                        scope='colgroup'
                        className='bg-gray-50 dark:bg-slate-700 dark:text-slate-300 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6'
                      >
                        Used
                      </th>
                    </tr>
                    {changeAddresses.map((address) => (
                      <AddressRow
                        key={address.address}
                        address={address}
                        searchQuery={searchQuery}
                        used={true}
                      />
                    ))}
                  </>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default requireOnchain(AddressesView);
