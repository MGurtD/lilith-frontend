export interface Enterprise {
    id: string;
    name: string;
    description: string;
    disabled: boolean;
}

export interface Site {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    postalCode: string;
    region: string;
    country: string;
    phoneNumber: string;
    email: string;
    vatNumber: string;
    enterpriseId: string;
    disabled: boolean;
}

export interface Area {
    id: string;
    name: string;
    description: string;
    siteId: string;
    disabled: boolean;
}

export interface WorkcenterType {
    id: string;
    name: string;
    description: string;
    disabled: boolean;
}

export interface Workcenter {
    id: string;
    name: string;
    description: string;
    workcenterTypeId: string;
    areaId: string;
    disabled: boolean;
}