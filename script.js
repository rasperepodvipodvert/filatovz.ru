// Auto-generate technology tags for companies based on Skills mapping
(function() {
    'use strict';

    // Mapping: company ID -> array of technology IDs used there
    // Based on actual tasks and responsibilities from work experience
    const companyTechnologies = {
        // b4com: DevOps компетенции из mange-infra
        'b4com': [
            // IaC & Configuration
            'ansible', 'terraform', 'opentofu', 'packer', 'jinja2', 'yaml', 'hcl',
            // Orchestration & Services
            'nomad', 'consul', 'docker', 'vault', 'traefik', 'servicemesh',
            // Virtualization & Systems
            'proxmox', 'linux', 'bash',
            // CI/CD
            'gitlab', 'jenkins', 'groovy', 'git', 'nexus', 'precommit', 'ansiblelint', 'shellcheck', 'trivy', 'gitleaks',
            // Networking
            'wireguard', 'vpn', 'coredns', 'loadbalancing', 'nginx', 'ldap',
            // Monitoring
            'zabbix',
            // Databases
            'redis', 'postgresql',
            // Security
            'secretsmanagement', 'aclrbac',
            // Languages
            'python',
            // AI/LLM
            'aiagents', 'llm', 'promptengineering'
        ],
        
        // СберМаркетинг: Cloud.ru, Nomad/Consul, Jenkins, Groovy, Grafana Loki + Vector, Yandex Cloud, Terraform/Ansible, Prometheus
        'sbermarketing': ['cloudru', 'yandexcloud', 'nomad', 'consul', 'jenkins', 'groovy', 'grafana', 'loki', 'vector', 'prometheus', 'terraform', 'ansible', 'bash'],
        
        // DSSL: Packer, VMware, Proxmox, мониторинг (Zabbix/Prometheus), Jenkins, Groovy, Ansible
        'dssl': ['packer', 'vmware', 'proxmox', 'zabbix', 'prometheus', 'jenkins', 'groovy', 'ansible', 'bash'],
        
        // СИСADМИН: Terraform, Packer, Ansible, GitOps, Zabbix, Grafana, Prometheus, Jenkins, Groovy
        'sisadmin': ['terraform', 'packer', 'ansible', 'gitops', 'zabbix', 'grafana', 'prometheus', 'jenkins', 'groovy', 'bash'],
        
        // FundCount: Jenkins, AWS, Windows (Automated Images), Python, BAT, PowerShell
        'fundcount': ['jenkins', 'aws', 'windows-automated', 'python', 'groovy', 'bash', 'bat', 'powershell'],
        
        // ГК "Апрель": Linux, Windows (системное администрирование), BAT, PowerShell
        'april': ['linux', 'windows', 'bash', 'bat', 'powershell'],
        
        // МЭСИ: Linux, Windows (120+ машин), VPN, BAT, PowerShell
        'mesi': ['linux', 'windows', 'vpn', 'bash', 'bat', 'powershell']
    };

    // Get technology display name from Skills section
    function getTechDisplayName(techId) {
        const techElement = document.querySelector(`#skills [data-tech="${techId}"]`);
        if (techElement) {
            return techElement.textContent.trim();
        }
        // Fallback: capitalize tech ID
        return techId.charAt(0).toUpperCase() + techId.slice(1).replace(/([A-Z])/g, ' $1');
    }

    // Generate technology tags for a company
    function generateCompanyTags(companyElement, techIds) {
        const technologiesContainer = companyElement.querySelector('.job__technologies');
        if (!technologiesContainer) return;

        // Clear existing content
        technologiesContainer.innerHTML = '';

        // Create tags for each technology
        techIds.forEach(techId => {
            const displayName = getTechDisplayName(techId);
            const tag = document.createElement('span');
            tag.setAttribute('data-tech', techId);
            tag.textContent = displayName;
            technologiesContainer.appendChild(tag);
        });
    }

    // Initialize: generate tags for all companies
    function init() {
        Object.keys(companyTechnologies).forEach(companyId => {
            const companyElement = document.querySelector(`[data-company="${companyId}"]`);
            if (companyElement) {
                const techIds = companyTechnologies[companyId];
                generateCompanyTags(companyElement, techIds);
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
