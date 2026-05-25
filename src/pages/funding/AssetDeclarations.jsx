import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { setTitle } from '../../helpers/browser';
import { labels, t } from '../../helpers/dictionary';
import { contains } from '../../helpers/helpers';
import { routes } from '../../helpers/routes';

import FundingNav from '../../components/structure/FundingNav';
import Title from '../../components/structure/Title';
import Loading from '../../components/general/Loading';
import AlertWithIcon from '../../components/general/AlertWithIcon';

function AssetDeclarations() {
    setTitle(t(labels.assetDeclarations.pageTitle));

    const [searchQuery, setSearchQuery] = useState('');

    const { isLoading, error, data } = useQuery({
        queryKey: ['asset_declarations_list'],
        queryFn: () =>
            fetch(
                `${process.env.DHC_TYPO3_API_DOMAIN}/elections/asset-declarations/`
            ).then((response) => response.json()),
    });

    let content;

    if (isLoading || error) {
        content = <Loading error={error} />;
    } else {
        const officials = data ?? [];
        const filteredOfficials = officials.filter((o) =>
            contains(o.name, searchQuery)
        );

        if (filteredOfficials.length === 0) {
            content = (
                <AlertWithIcon variant="danger">
                    {t(labels.assetDeclarations.noOfficialFound)}
                </AlertWithIcon>
            );
        } else {
            content = (
                <Row className="g-4">
                    {filteredOfficials.map((official) => {
                        // Sort declarations chronologically
                        const sortedDeclarations = [
                            ...official.declarations,
                        ].sort((a, b) => a.year - b.year);

                        return (
                            <Col key={official.official_id} md={6} lg={4}>
                                <Card className="h-100 shadow-sm border-0 bg-light">
                                    <Card.Body className="d-flex flex-column justify-content-between p-4">
                                        <div>
                                            <Card.Title className="fw-bold mb-3">
                                                {official.name}
                                            </Card.Title>
                                            <Card.Subtitle className="mb-3 text-muted">
                                                {t(
                                                    labels.assetDeclarations
                                                        .declarationsCount,
                                                    [
                                                        official.declarations
                                                            .length,
                                                    ]
                                                )}
                                            </Card.Subtitle>
                                            <div className="mb-4">
                                                {sortedDeclarations.map(
                                                    (decl) => (
                                                        <Badge
                                                            key={decl.uid}
                                                            bg="primary"
                                                            className="me-1 mb-1 p-2"
                                                            style={{
                                                                fontSize:
                                                                    '0.85rem',
                                                            }}
                                                        >
                                                            {decl.year}
                                                        </Badge>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            as={Link}
                                            to={routes.assetDeclaration(
                                                official.official_id
                                            )}
                                            variant="dark"
                                            className="w-100 mt-2 py-2"
                                        >
                                            {t(labels.learnMore)}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            );
        }
    }

    return (
        <section>
            <Title secondaryWords={1}>
                {t(labels.assetDeclarations.pageTitle)}
            </Title>

            <FundingNav />

            <div className="search-bar mb-4">
                <Form onSubmit={(e) => e.preventDefault()}>
                    <InputGroup className="shadow-sm">
                        <Form.Control
                            type="search"
                            placeholder={t(
                                labels.assetDeclarations.searchPlaceholder
                            )}
                            aria-label={t(labels.search.label)}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="py-3 px-4"
                        />
                        <InputGroup.Text className="bg-white border-start-0 px-3">
                            🔍
                        </InputGroup.Text>
                    </InputGroup>
                </Form>
            </div>

            {content}
        </section>
    );
}

export default AssetDeclarations;
