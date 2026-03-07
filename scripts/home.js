const allCardSection = document.getElementById('all-card-section')
const openCardSection = document.getElementById('open-card-section')
const closedCardSection = document.getElementById('closed-card-section')
const state = document.getElementById('state')
const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues'
let allIssuesData = []

const allIssues = async () => {
    const res = await fetch(url)
    const data = await res.json()
    allIssuesData = data.data
    displayAllIssues(allIssuesData)
    displayOpenIssues(allIssuesData)
    displayClosedIssues(allIssuesData)
    state.innerText = allCardSection.children.length
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


const createIssueCard = (issue) => {
    const createdDate = new Date(issue.createdAt);
    const formattedDate = `${createdDate.getMonth() + 1}/${createdDate.getDate()}/${createdDate.getFullYear()}`;

    const div = document.createElement('div')
    div.innerHTML = `
        <div onclick = 'loadDetail(${issue.id})' class="card card-body border-t-4 ${cardTopBorder(issue.status)} shadow-md space-y-5">
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
    return div
}


const displayAllIssues = (issues) => {
    issues.forEach(issue => {
        allCardSection.appendChild(createIssueCard(issue))
    });
}

const displayOpenIssues = (issues) => {
    const openIssues = issues.filter(issue => issue.status === 'open')
    openIssues.forEach(issue => {
        openCardSection.appendChild(createIssueCard(issue))
    });
}

const displayClosedIssues = (issues) => {
    const closedIssues = issues.filter(issue => issue.status === 'closed')
    closedIssues.forEach(issue => {
        closedCardSection.appendChild(createIssueCard(issue))
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



    const toggolingSection = [allCardSection, openCardSection, closedCardSection]
    toggolingSection.forEach(section => {
        section.classList.add('hidden')
        allCardSection.innerHTML = ''
        openCardSection.innerHTML = ''
        closedCardSection.innerHTML = ''
        if (currentTab === 'allBtn') {
            displayAllIssues(allIssuesData)
            allCardSection.classList.remove('hidden')
            state.innerText = allCardSection.children.length
        }
        if (currentTab === 'openBtn') {
            displayOpenIssues(allIssuesData)
            openCardSection.classList.remove('hidden')
            state.innerText = openCardSection.children.length
        }
        if (currentTab === 'closedBtn') {
            displayClosedIssues(allIssuesData)
            closedCardSection.classList.remove('hidden')
            state.innerText = closedCardSection.children.length
        }
    });
}


document.getElementById('btn-search').addEventListener('click', async () => {
    switchTab('allBtn')
    document.getElementById('tab-allBtn').classList.add('btn-soft')
    allCardSection.innerHTML = ''
    const input = document.getElementById('input-search')
    const searchValue = input.value.trim().toLowerCase()

    const res = await fetch(url)
    const data = await res.json()
    const allWords = data.data

    const filterWords = allWords.filter(word =>
        word.title.toLowerCase().includes(searchValue)
    )
    displayAllIssues(filterWords)
    state.innerText = allCardSection.children.length
})




const loadDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    console.log(url)
    const res = await fetch(url)
    const detils = await res.json()
    displayDetils(detils.data)
}



const modalState = (parm) => {
    if (parm === 'open') {
        return 'badge-success'
    }
    else {
        return 'badge-info'
    }
}

const displayDetils = (detils) => {
    console.log(detils)
    const createdDate = new Date(detils.updatedAt);
    const formattedDate = `${createdDate.getMonth() + 1}/${createdDate.getDate()}/${createdDate.getFullYear()}`;
    const updatedAuthor = detils.author.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const detilesContainer = document.getElementById('detiles-container')
    detilesContainer.innerHTML = `
    <div class="space-y-5">
        <h3 class="text-2xl">${detils.title}</h3>
        <div class="flex gap-5 items-center">
            <div class="badge ${modalState(detils.status)}">${detils.status === 'open' ? 'Opened' : 'Closed'}</div>
            <ul class="flex gap-5 text-[12px]">
                <li class="before:content-['•'] opacity-50"> ${updatedAuthor}</li>
                <li class="before:content-['•'] opacity-50"> ${formattedDate}</li>
            </ul>
        </div>
        <div class="space-x-2">
            ${dynamicBadges(detils.labels)}
        </div>
        <p>${detils.description}</p>
        <div class="flex justify-between items-center bg-base-300 p-2 rounded-sm">
            <div>
                <p>Assignee:</p>
                <span>${updatedAuthor}</span>
            </div>
            <div>
                <p>Assignee:</p>
                <div class="badge ${priorityColor(detils.priority)}">${detils.priority}</div>
            </div>
            <div></div>
        </div>
    </div>
    `
    document.getElementById('modal_display').showModal()
}