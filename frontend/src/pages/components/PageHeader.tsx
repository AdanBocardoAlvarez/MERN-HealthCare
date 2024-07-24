const PageHeader = ({ title = "", subTitle = "", className = "" }) => {
    return (
        <header className={`page-header ${className}`}>
            <div className='mb-3'>
                <h1 className='page-title mb-0'>{title}</h1>
                {subTitle && <p className='text-900'>{subTitle}</p>}
            </div>
        </header>
    )
}

export default PageHeader;