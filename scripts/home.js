const cardSection = document.getElementById('all-card-section')


const allIssues = async () => {
    const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
    const res = await fetch(url)
    const data = await res.json()
    displayAllIssues(data.data)
}
allIssues()


const priorityColor = (priority) => {
    if (priority === 'high') {
        return 'badge-error bg-error/30 border-0'
    }
    else if (priority === 'medium') {
        return 'badge-warning bg-warning/30 border-0'
    }
    else {
        return 'badge-neutral bg-neutral/50 text-white border-0'
    }
}

const labelstate = (label) => {
    if (label === 'bug') {
        return {
            icon: 'fa-solid fa-bug',
            color: 'badge-error bg-error/30 border-0'
        }
    }
    else if (label === 'enhancement') {
        return {
            icon: 'fa-solid fa-wand-magic-sparkles',
            color: 'badge-success bg-success/30 border-0'
        }
    }
    else {
        return {
            icon: 'fa-regular fa-life-ring',
            color: 'badge-neutral bg-neutral/40 text-white border-0'
        }
    }
}

const cardTopBorder = (parm) => {
    if (parm === 'open') {
        return 'border-green-500'
    }
    else {
        return 'border-purple-500'
    }
}


const dynamicBadges = (arr) => {
    const badges = arr.map((el) => {
        const element = labelstate(el)
        return `<div class="badge ${element.color}"><i class="${element.icon}"></i> ${el}</div>`
    })
    return badges.join(' ')
}
const displayAllIssues = (issues) => {
    issues.forEach(issue => {
        console.log(issue)
        const createdDate = new Date(issue.createdAt);
        const formattedDate = `${createdDate.getMonth() + 1}/${createdDate.getDate()}/${createdDate.getFullYear()}`;
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card card-body border-t-4 ${cardTopBorder(issue.status)} shadow-md space-y-5">
                <div class="flex justify-between">
                    <img src="assets/${issue.status === 'open' ? 'Open' : 'Closed'}-Status.png" alt="">
                    <div class="badge ${priorityColor(issue.priority)}">${issue.priority}</div>
                </div>
                <div>
                    <h4 class="text-lg font-semibold line-clamp-1">${issue.title}</h4>
                    <p class="text-sm text-base-content/50 line-clamp-2">${issue.description}</p>
                </div>
                <div class="flex gap-3">
                    ${dynamicBadges(issue.labels)}
                </div>
                <hr class="-mx-6 opacity-20">
                <div class="text-base-content/50 text-sm">
                    <p>${issue.id} by ${issue.author}</p>
                    <p>${formattedDate}</p>
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
        if (tab === currentTab) {
            clickedTab.classList.remove(...tabStatus)
        }
        else (
            clickedTab.classList.add(...tabStatus)
        )
    }
}