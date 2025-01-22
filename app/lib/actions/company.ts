export async function fetchCompanyData(companyId: string) {
    
    const response = await fetch(`/api/companies/${companyId}`);
    return response.json();
  }