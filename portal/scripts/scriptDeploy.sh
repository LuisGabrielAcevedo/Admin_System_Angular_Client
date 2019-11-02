#!/bin/bash
export lang=pt_BR.utf-8
#decalrativa de métodos
createNewSettingsJs(){    
    amb=$(echo "$2" | tr '[:lower:]' '[:upper:]')
    case $1 in
        "analisedoccdc")
            echo -e "\nCriando novos arquivos de Settings para a pasta: $1"
            mv /tmp/00-resources/$1/scripts/config/settings.${amb}.js /tmp/00-resources/$1/scripts/config/settings.js
        ;;
        "portalcliente")
            mv /tmp/00-resources/$1/config/settings.${amb}.SANTANDER.js /tmp/00-resources/$1/config/settings.js
        ;;
        "portalnegociocdc")
            echo -e "\nCriando novos arquivos de Settings para a pasta: $1"
            mv /tmp/00-resources/$1/scripts/config/settings.${amb}.SANTANDER.js /tmp/00-resources/$1/scripts/config/settings.js
        ;;
        *"hyundai"*)
            echo -e "\nCriando novos arquivos de Settings para a pasta: $1"

            if [ $3 = "portalcliente" ]; then
	
                mv /tmp/00-resources/$1/config/settings.${amb}.HYUNDAI.js /tmp/00-resources/$1/config/settings.js
                else 
                    mv /tmp/00-resources/$1/scripts/config/settings.${amb}.HYUNDAI.js /tmp/00-resources/$1/scripts/config/settings.js
            fi
        ;;
        *"volvo"*)
            echo -e "\nCriando novos arquivos de Settings para a pasta: $1"
            if [ $3 = "portalcliente" ]; then
	
                mv /tmp/00-resources/$1/config/settings.${amb}.VOLVO.js /tmp/00-resources/$1/config/settings.js
                else 
                   mv /tmp/00-resources/$1/scripts/config/settings.${amb}.VOLVO.js /tmp/00-resources/$1/scripts/config/settings.js
            fi
        ;;
        *"callcenter"*)
            echo -e "\nCriando novos arquivos de Settings para a pasta: $1"
            mv /tmp/00-resources/$1/config/settings.${amb}.CALLCENTER.js /tmp/00-resources/$1/config/settings.js
        ;;
		"portalsanrio")
            echo -e "\nCriando novos arquivos de Settings para a pasta: $1"
            mv /tmp/00-resources/$1/config/settings.${amb}.SANTANDER.js /tmp/00-resources/$1/config/settings.js
        ;;
        *)
            echo "Projeto não configurado para essa solução."
            exit 1
        ;;

    esac
}

removeJsDefault(){
    echo -e "\nRemovendo o arquivo $1/config/settings.js"
    rm -rf /tmp/00-resources/$1/config/settings.js
}
renameFolder(){
    echo -e "\nRenomeando pasta $1"
    filename="$1"
    cliente=$(echo ${filename#$3})
    #echo "cliente: "$cliente
    mv /tmp/00-resources/$1 /tmp/00-resources/$3${2}$cliente
}

#declaração de varáveis
arrayTmp=$1
co_env=$(echo "$2" | tr '[:upper:]' '[:lower:]')
co_baseName=$3

arrayTmp=$(echo "${arrayTmp/"["/}")
arrayTmp=$(echo "${arrayTmp/"]"/}")

IFS=',' read -a array <<< $arrayTmp

#Main     
for i in "${array[@]}"
do
    removeJsDefault $i
    createNewSettingsJs $i $co_env $co_baseName
    renameFolder $i $co_env $co_baseName
done