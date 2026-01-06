class CommonUtils {
    // static isNumber1(number) {
    //     if (number === 1) return true;
    //     return false;
    // }
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    }
}

export default CommonUtils;