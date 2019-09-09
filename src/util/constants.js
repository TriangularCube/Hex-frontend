// Width step before considered "Large"
export const isLarge = 'md';

// Drawer Width
export const drawerWidth = 200;

// Page Width
export const pageWidth = 1150;

// Page Side Padding
export const sidePadding = 16;

export const targetRegion = 'us-west-2';
const apiUrl = 'https://api.hexahedron.io/';
const devPoolId = 'us-west-2_yElmrcFZi';
const devAppClientId = '4rsetrs95hiqlcnta5f8vggcua';
export const targets = {
    local: {
        url: 'http://localhost:3000',
        poolId: devPoolId,
        appClientId: devAppClientId,
        stage: 'local'
    },
    dev: {
        url: apiUrl + 'dev',
        poolId: devPoolId,
        appClientId: devAppClientId,
        stage: 'dev'
    },
    devMaster: {
        url: apiUrl + 'dev-master',
        poolId: 'us-west-2_f1LrnODPv',
        appClientId: 'rb0ct2s0rggsr32fq32b94kha',
        stage: 'dev-master'
    },
    staging: {
        url: apiUrl + 'staging',
        poolId: 'us-west-2_ZAxCUlxHF',
        appClientId: '6hdp2ohka9o20hshenplktgpml',
        stage: 'staging'
    },
    production: {
        // TODO
    }
};