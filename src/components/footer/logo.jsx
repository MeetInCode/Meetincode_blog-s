
const Logo = () => {
    const logoStyle = {
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fontSize: '32px',
        color: '#61dafb', // React logo color
        letterSpacing: '2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px',
    };

    const codeStyle = {
        color: '#282c34', // Dark gray color
    };

    return (
        <div style={logoStyle}>
            Meet<span style={codeStyle}>InCode</span>
        </div>
    );
};

export default Logo;
