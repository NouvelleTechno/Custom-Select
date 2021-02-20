// On s'assure que le DOM est chargé
window.onload = () => {
    // On récupère le select
    const selectElt = document.querySelector("select");

    // On récupère la 1ère DIV "custom-select"
    const selectDiv = document.querySelector(".custom-select");

    // On crée le nouveau select
    const newSelect = document.createElement("div");

    // On lui ajoute la classe "new-select"
    newSelect.classList.add("new-select");

    // On lui donne le contenu de l'option actuellement choisie dans le select
    newSelect.innerHTML = selectElt.options[selectElt.selectedIndex].innerHTML;

    // On crée l'élément dans le DOM
    selectDiv.appendChild(newSelect);

    // On crée le menu déroulant
    const newMenu = document.createElement("div");
    newMenu.classList.add("select-items", "select-hide");

    // On va boucler sur toutes les options dans le select et les copier dans la div
    for(let option of selectElt.options){
        // On crée une div pour cette option
        const newOption = document.createElement("div");

        // On copie le contenu de l'option
        newOption.innerHTML = option.innerHTML;

        // On ajoute un écouteur d'évènements "clic" sur l'option
        newOption.addEventListener("click", function(){
            // On boucle sur chacune des options du select original
            for(let option of selectElt.options){
                if(option.innerHTML === this.innerHTML){
                    // On active la bonne option dans le select
                    selectElt.selectedIndex = option.index;
                    
                    // On change le texte de notre "newSelect"
                    newSelect.innerHTML = this.innerHTML;
                    break;
                }
            }
            // On "simule" un clic sur newSelect
            newSelect.click();
        });

        // On ajoute l'option dans le "newMenu"
        newMenu.appendChild(newOption);
    }

    // On affiche le menu
    selectDiv.appendChild(newMenu);

    // On ajoute l'écouteur d'évènements click sur newSelect
    newSelect.addEventListener("click", function(e){
        // On empêche la propagation du clic
        e.stopPropagation();
        
        // On retire le "select-hide" de notre menu
        this.nextSibling.classList.toggle("select-hide");
        
        // On ajoute la classe active à newSelect (changer la flèche)
        this.classList.toggle("active");

        // On modifie l'attribut "contenteditable" pour pouvoir taper une valeur
        if(this.getAttribute("contenteditable") == "true"){
            this.setAttribute("contenteditable", "false");
        }else{
            this.setAttribute("contenteditable", "true");
            // On donne le focus à notre champ
            this.focus();
        }
    });

    // On met en place le filtre de contenu sur l'évènement input
    newSelect.addEventListener("input", function(){
        // On récupère la saisie en minuscules
        let saisie = this.textContent.toLowerCase();

        // On parcourt tous les enfants de notre menu
        for(let option of newMenu.children){
            // On vérifie si la saisie existe dans la chaîne
            if(option.textContent.toLowerCase().search(saisie) > -1){
                option.style.display = "block";
            }else{
                option.style.display = "none";

            }
        }
    });
}