function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className=" bg-slate-900 text-gray-100 text-center py-7 px-4 text-sm">
            @{year} Find It Namibia
        </footer>
    );
}

export default Footer;