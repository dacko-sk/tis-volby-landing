import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import DownloadLink from '../../../components/general/DownloadLink';
import Loading from '../../../components/general/Loading';

import { sortBySurname } from '../../../helpers/helpers';

import useAdsData, { csvConfig } from '../../../hooks/AdsData';

function CandidatesReports() {
    const { allCandidatesNames, candidateAdsData } = useAdsData();

    const allCandidates = (allCandidatesNames() ?? []).sort(sortBySurname);

    if (!allCandidates.length) {
        return <Loading />;
    }

    return (
        <Row>
            {allCandidates.flatMap((name) => {
                const adsData = candidateAdsData(name);
                return adsData && adsData[csvConfig.ACCOUNTS.columns.REPORT]
                    ? [
                          <Col key={name} md={6} lg={4}>
                              <DownloadLink
                                  to={
                                      adsData[csvConfig.ACCOUNTS.columns.REPORT]
                                  }
                              >
                                  <h3 className="text-secondary text-capitalize my-0">
                                      {name}
                                  </h3>
                              </DownloadLink>
                          </Col>,
                      ]
                    : [];
            })}
        </Row>
    );
}

export default CandidatesReports;
