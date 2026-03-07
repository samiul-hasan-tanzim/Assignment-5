const cardSection = document.getElementById('all-card-section')


const allIssues = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    const res = await fetch(url)
    const data = await res.json()
    displayAllIssues(data.data)
}
allIssues()

const displayAllIssues = (issues) => {
    issues.forEach(issue => {
        // console.log(issue)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card card-body border-t-4 border-green-500 shadow-md space-y-5">
                <div class="flex justify-between">
                    <img src="assets/Open-Status.png" alt="">
                    <div class="badge badge-error bg-error/30">High</div>
                </div>
                <div>
                    <h4 class="text-lg font-semibold">Fix navigation menu on mobile devices</h4>
                    <p class="text-sm text-base-content/50">The navigation menu doesn't collapse properly on mobile
                        devices...</p>
                </div>
                <div class="flex gap-3">
                    <div class="badge badge-error bg-error/30"><i class="fa-solid fa-bug"></i> Bug</div>
                    <div class="badge badge-warning bg-warning/30"><i class="fa-regular fa-life-ring"></i> help wanted
                    </div>
                </div>
                <hr class="-mx-6 opacity-20">
                <div class="text-base-content/50 text-sm">
                    <p>#1 by john_doe</p>
                    <p>1/15/2024</p>
                </div>
            </div>
        `
        cardSection.appendChild(div)
    });
}


const tabStatus = ['btn-soft']
const switchTab = (currentTab) => {
    const tabs = ['allBtn', 'openBtn', 'closedBtn']
    for (const tab of tabs) {
        const clickedTab = document.getElementById('tab-' + tab)
        console.log(tab)
        console.log(clickedTab)
        if (tab === currentTab) {
            clickedTab.classList.remove(...tabStatus)
        }
        else (
            clickedTab.classList.add(...tabStatus)
        )
    }
}