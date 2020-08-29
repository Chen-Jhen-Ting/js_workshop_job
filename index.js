window.addEventListener('DOMContentLoaded',function(){
    // 漢堡的下拉選單
    let burgerBtn = document.querySelector('#navbar-burger')
    let page = 1
    let pageBtn = document.querySelector('a[class="pagination-next m-0-auto"]')
    let searchBtn = document.querySelector('[type="submit"]')
    let pannel = document.querySelector('#job-pannel')
    burgerBtn.addEventListener('click',function(){
        document.querySelector('#navbar-menu').classList.toggle('is-active')
    })

    searchBtn.addEventListener('click',function(e){
        e.preventDefault()
        pannel.innerHTML = ""
        page = 1
        axios.get(urlGenerator())
            .then(function (response) {
                return response.data
            })
            .then(function(data){ 
                // console.log(data)
                randerData(data)
            })
            .catch(function (error) {
                console.log(error);
            })
    })

    pageBtn.addEventListener('click',function(){
        if(pageBtn.hasAttribute('disabled')){
            return
        }else{
            page+=1
            axios.get(`${urlGenerator()}`+`&page=${page}`)
                .then(function (response) {
                    return response.data
                })
                .then(function(data){ 
                    // console.log(data)
                    randerData(data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    })

    function urlGenerator(){
        let description = document.querySelector('[name="description"]')
        let location = document.querySelector('[name="location"]')
        let fullTime = document.querySelector('[name="full_time"]')
        let url=`https://still-spire-37210.herokuapp.com/positions.json?`
        
        url = `${url}`+ `description=${description.value}`+ `&location=${location.value}`
        
        if (fullTime.checked){
            url = `${url}` + `&full_time=on`
        }
        return url
    }
 
    function randerData(data){
        data.forEach(data => {
            let t = document.querySelector('template')
            let jobInfo = t.content.querySelector('tr td h4 a')
            jobInfo.href = data.url
            jobInfo.textContent = data.title
            let company = t.content.querySelector('tr td a')
            company.href = data.company_url
            company.textContent = data.company
            let location = t.content.querySelector('.meta .location')
            location.textContent = data.location
            let fullTime = t.content.querySelector('.fulltime')
            fullTime.textContent = data.type
            var clone = document.importNode(t.content, true);
            pannel.appendChild(clone)
        })
        removeDisable()
    }

    function removeDisable(){
        if(document.querySelectorAll('tbody tr').length % 50  == 0 ){
            pageBtn.removeAttribute('disabled')
        }else{
            pageBtn.setAttribute('disabled','true')
        }
    }
    

})
