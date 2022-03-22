/**
 * Util
 * @extends null
 */
class Util extends null {

    constructor() {
        throw new Error('Util class should not be an instance.');
    }

    /**
     * Get skin type by UUID
     * @param uuid Player UUID
     */
    public static getSkinType(uuid: string): | 'steve' | 'alex' {
        if (uuid.length <= 16) 
            return 'steve';

        let lsbs_even = parseInt(uuid[7], 16) ^
                        parseInt(uuid[15], 16) ^
                        parseInt(uuid[23], 16) ^
                        parseInt(uuid[31], 16);

        return lsbs_even ? 'alex' : 'steve';
    }

}

export default Util;