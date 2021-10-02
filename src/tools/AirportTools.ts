export const getAirportLabel = (type: string): string => {
    switch (type) {
        case 'large_airport':
            return 'Large';
        case 'medium_airport':
            return 'Medium';
        case 'small_airport':
            return 'Small';
        case 'seaplane_base':
            return 'Seaplane base';
        default:
            return type;
    }
};
