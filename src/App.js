import React,{useEffect,useState} from 'react'
import wordsToNumbers from 'words-to-numbers'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards  from './components/NewsCards/NewsCards'
import useStyles from './styles.js';
const alanKey='0a1cbe2b4456eae75e409xyz....'
const App=()=>{
    const[newsArticles,setNewsArticles]=useState([]);
    const classes=useStyles();
    const [activeArticle,setActiveArticle]=useState(-1);
        useEffect(()=>{
        alanBtn({
            key:alanKey,
            onCommand:({command,articles,number})=>{
                if(command ==='newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1)
                }
                else if (command==='highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1)
                }
                else if(command==='open'){
                   const parsedNumber=number.length>2 ? wordsToNumbers(number,{fuzzy:true}):number;
                   const article=articles[parsedNumber-1]
                   if(parsedNumber>20){
                       alanBtn().playText('Please try that again ')
                   }
                   else if(article){
                    window.open(article.url,'_blank');
                    alanBtn().playText('opening... ')
                   }
                   
                }
            }
        }
            
        )
    },[])
    return(
        <div>
            <div className={classes.logoContainer}>

            <img src="https://centaur-wp.s3.eu-central-1.amazonaws.com/designweek/prod/content/uploads/2020/06/04133343/Banner-image-3-1536x864.jpg" className={classes.alanLogo} alt="logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}
export default App