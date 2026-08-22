export default function PageHeader({child}){
    return(
        <>
         {/* Page Header Start */}
                <div className="container-fluid page-header py-5">
                    <div className="container text-center py-5">
                        <h1 className="display-2 text-white mb-4 animated slideInDown">
                            {child}
                        </h1>
                        <nav aria-label="breadcrumb animated slideInDown">
                        </nav>
                    </div>
                </div>
                {/* Page Header End */}
        </>
    )
}