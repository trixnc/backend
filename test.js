const isPhoneNumber = (credential) => {
    console.log("1");
    if (credential.length !== 8) return false;
    console.log("2");
    if (isNaN(Number(credential))) return false;
    console.log("3");
    const firstCharacter = credential[0];
    if (!("9", "8", "7", "6").includes(firstCharacter)) return false;
    console.log("4");
    return true;
};

console.log(isPhoneNumber("6111111"));
