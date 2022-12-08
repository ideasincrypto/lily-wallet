import { MacaroonPermission } from '@lily-technologies/lnrpc';

const macaroons = [
  '/chainrpc.ChainNotifier/RegisterBlockEpochNtfn',
  '/chainrpc.ChainNotifier/RegisterConfirmationsNtfn',
  '/chainrpc.ChainNotifier/RegisterSpendNtfn',
  '/invoicesrpc.Invoices/AddHoldInvoice',
  '/invoicesrpc.Invoices/CancelInvoice',
  '/invoicesrpc.Invoices/LookupInvoiceV2',
  '/invoicesrpc.Invoices/SettleInvoice',
  '/invoicesrpc.Invoices/SubscribeSingleInvoice',
  '/lnrpc.Lightning/AbandonChannel',
  '/lnrpc.Lightning/AddInvoice',
  '/lnrpc.Lightning/BatchOpenChannel',
  '/lnrpc.Lightning/ChannelAcceptor',
  '/lnrpc.Lightning/ChannelBalance',
  '/lnrpc.Lightning/CheckMacaroonPermissions',
  '/lnrpc.Lightning/CloseChannel',
  '/lnrpc.Lightning/ClosedChannels',
  '/lnrpc.Lightning/ConnectPeer',
  '/lnrpc.Lightning/DebugLevel',
  '/lnrpc.Lightning/DecodePayReq',
  '/lnrpc.Lightning/DescribeGraph',
  '/lnrpc.Lightning/DisconnectPeer',
  '/lnrpc.Lightning/EstimateFee',
  '/lnrpc.Lightning/ExportAllChannelBackups',
  '/lnrpc.Lightning/ExportChannelBackup',
  '/lnrpc.Lightning/FeeReport',
  '/lnrpc.Lightning/ForwardingHistory',
  '/lnrpc.Lightning/FundingStateStep',
  '/lnrpc.Lightning/GetChanInfo',
  '/lnrpc.Lightning/GetInfo',
  '/lnrpc.Lightning/GetNetworkInfo',
  '/lnrpc.Lightning/GetNodeInfo',
  '/lnrpc.Lightning/GetNodeMetrics',
  '/lnrpc.Lightning/GetRecoveryInfo',
  '/lnrpc.Lightning/GetTransactions',
  '/lnrpc.Lightning/ListAliases',
  '/lnrpc.Lightning/ListChannels',
  '/lnrpc.Lightning/ListInvoices',
  '/lnrpc.Lightning/ListMacaroonIDs',
  '/lnrpc.Lightning/ListPayments',
  '/lnrpc.Lightning/ListPeers',
  '/lnrpc.Lightning/ListPermissions',
  '/lnrpc.Lightning/ListUnspent',
  '/lnrpc.Lightning/LookupInvoice',
  '/lnrpc.Lightning/NewAddress',
  '/lnrpc.Lightning/OpenChannel',
  '/lnrpc.Lightning/OpenChannelSync',
  '/lnrpc.Lightning/PendingChannels',
  '/lnrpc.Lightning/QueryRoutes',
  '/lnrpc.Lightning/RestoreChannelBackups',
  '/lnrpc.Lightning/StopDaemon',
  '/lnrpc.Lightning/SubscribeChannelBackups',
  '/lnrpc.Lightning/SubscribeChannelEvents',
  '/lnrpc.Lightning/SubscribeChannelGraph',
  '/lnrpc.Lightning/SubscribeCustomMessages',
  '/lnrpc.Lightning/SubscribeInvoices',
  '/lnrpc.Lightning/SubscribePeerEvents',
  '/lnrpc.Lightning/SubscribeTransactions',
  '/lnrpc.Lightning/UpdateChannelPolicy',
  '/lnrpc.Lightning/VerifyChanBackup',
  '/lnrpc.Lightning/VerifyMessage',
  '/lnrpc.Lightning/WalletBalance',
  '/neutrinorpc.NeutrinoKit/AddPeer',
  '/neutrinorpc.NeutrinoKit/DisconnectPeer',
  '/neutrinorpc.NeutrinoKit/GetBlock',
  '/neutrinorpc.NeutrinoKit/GetBlockHash',
  '/neutrinorpc.NeutrinoKit/GetBlockHeader',
  '/neutrinorpc.NeutrinoKit/GetCFilter',
  '/neutrinorpc.NeutrinoKit/IsBanned',
  '/neutrinorpc.NeutrinoKit/Status',
  '/peersrpc.Peers/UpdateNodeAnnouncement',
  '/routerrpc.Router/BuildRoute',
  '/routerrpc.Router/EstimateRouteFee',
  '/routerrpc.Router/GetMissionControlConfig',
  '/routerrpc.Router/QueryMissionControl',
  '/routerrpc.Router/QueryProbability',
  '/routerrpc.Router/ResetMissionControl',
  '/routerrpc.Router/SetMissionControlConfig',
  '/routerrpc.Router/SubscribeHtlcEvents',
  '/routerrpc.Router/TrackPayment',
  '/routerrpc.Router/TrackPaymentV2',
  '/routerrpc.Router/UpdateChanStatus',
  '/routerrpc.Router/XImportMissionControl',
  '/signrpc.Signer/VerifyMessage',
  '/verrpc.Versioner/GetVersion',
  '/walletrpc.WalletKit/BumpFee',
  '/walletrpc.WalletKit/EstimateFee',
  '/walletrpc.WalletKit/LabelTransaction',
  '/walletrpc.WalletKit/LeaseOutput',
  '/walletrpc.WalletKit/ListAccounts',
  '/walletrpc.WalletKit/ListLeases',
  '/walletrpc.WalletKit/ListSweeps',
  '/walletrpc.WalletKit/ListUnspent',
  '/walletrpc.WalletKit/NextAddr',
  '/walletrpc.WalletKit/PendingSweeps',
  '/walletrpc.WalletKit/PublishTransaction',
  '/walletrpc.WalletKit/ReleaseOutput',
  '/walletrpc.WalletKit/RequiredReserve',
  '/watchtowerrpc.Watchtower/GetInfo',
  '/wtclientrpc.WatchtowerClient/AddTower',
  '/wtclientrpc.WatchtowerClient/GetTowerInfo',
  '/wtclientrpc.WatchtowerClient/ListTowers',
  '/wtclientrpc.WatchtowerClient/Policy',
  '/wtclientrpc.WatchtowerClient/RemoveTower',
  '/wtclientrpc.WatchtowerClient/Stats'
];

export const generateMacaroonPermissions = (): MacaroonPermission[] => {
  return macaroons.map((macaroon) => {
    const permission: MacaroonPermission = {
      entity: 'uri',
      action: macaroon
    };
    return permission;
  });
};
