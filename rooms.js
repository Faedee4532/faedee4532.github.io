// rooms.js — registry of each room/project and the skills it exercised.
// The index aggregates the union of every skill listed here.
// Add a new entry to register it in the full skills profile.

window.ROOMS = [
    { id: 'nexus', name: 'Nexus — HTB', skills: [
        'nmap', 'ffuf', 'gobuster', 'cve', 'fileupload', 'burp',
        'env', 'mysql', 'docker', 'reuse', 'gitplumb'
    ] },
    { id: 'orion', name: 'Orion — HTB', skills: [
        'nmap', 'wappalyzer', 'ffuf', 'cve', 'deser', 'csrf', 'msf',
        'env', 'mysql', 'hashcat', 'reuse', 'telnet'
    ] },
    { id: 'athena', name: 'Athena — THM', skills: [
        'nmap', 'apache', 'smb', 'cmdinj', 'burp', 'commix', 'pspy',
        'cron', 'sudo', 'lkm', 'ghidra', 'bashscript', 'ssh'
    ] },
    { id: 'valley', name: 'Valley — THM', skills: [
        'nmap', 'rustscan', 'ftp', 'ffuf', 'pcap', 'upx', 'md5',
        'john', 'cron', 'pyhijack', 'suid', 'ssh'
    ] },
    { id: 'madness', name: 'Madness — THM', skills: [
        'nmap', 'magicbytes', 'steghide', 'rot13', 'burp', 'suid',
        'searchsploit', 'ssh'
    ] },

    // Home / builder projects
    { id: 'ornith', name: 'ornith_cli', skills: [ 'python', 'ollama', 'tkinter' ] },
    { id: 'esp32', name: 'ESP32 monitor', skills: [ 'esp32', 'python' ] },
    { id: 'gpu', name: 'Local inference eval', skills: [ 'gpu', 'python' ] },
    { id: 'arch', name: 'Arch Linux', skills: [ 'arch' ] },
    { id: 'report', name: 'Pen-Test Report', skills: [ 'report' ] },
];
